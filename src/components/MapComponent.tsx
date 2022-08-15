import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function CenterComponent() {
  const [position, setPosition] = useState([L.latLng(0, 0)]);
  const leafletMap = useMapEvents({
    moveend() {
      const bounds = leafletMap.getBounds();
      const coordinates = [];
      for (let i = 0; i < 10; i++) {
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
          <Popup>You are here</Popup>
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
