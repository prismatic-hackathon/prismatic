import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function CenterComponent() {
  const leafletMap = useMap();
  console.log('map center:', leafletMap.getCenter());
  return null;
}

function MapComponent() {
  return (
    <MapContainer
      center={[39.23, -98.1]}
      zoom={5}
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
