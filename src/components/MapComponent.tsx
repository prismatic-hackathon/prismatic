import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import PopupComponent from './PopupComponent';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function CenterComponent() {
  const [position, setPosition] = useState([L.latLng(0, 0)]);
  const leafletMap = useMapEvents({
    zoomend() {
      const bounds = leafletMap.getBounds();
      const coordinates = [];
      for (let i = 0; i < 7; i++) {
        const randomLat = getRandomArbitrary(
          bounds.getNorth(),
          bounds.getSouth()
        );
        const randomLong = getRandomArbitrary(
          bounds.getEast(),
          bounds.getWest()
        );
        const randomCoordinate = L.latLng(randomLat, randomLong);
        coordinates.push(randomCoordinate);
      }
      setPosition(coordinates);
    },
  });
  return position === [L.latLng(0, 0)] ? null : (
    <>
      {position.map((coord: LatLng, index: number) => (
        <Marker position={coord} key={index}>
          <PopupComponent position={coord}></PopupComponent>
        </Marker>
      ))}
    </>
  );
}

function MapComponent() {
  return (
    <MapContainer
      center={[39.23, -98.11]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: '60vh' }}
    >
      <CenterComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MapComponent;
