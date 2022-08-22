import { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import weatherService from './weatherService';

function HistoricalTempComponent(props: any) {
  const [temperature, setTemperature] = useState(0);
  const leafletMap = useMapEvents({
    async popupopen(e) {
      console.log(e.propagatedFrom);
      console.log(leafletMap.getCenter());
      const getHistoricalTemp = await weatherService.getHistorical(
        props.position
      );
      setTemperature(getHistoricalTemp);
    },
    popupclose() {
      setTemperature(0);
    },
  });
  return <div>{temperature}</div>;
}

function PopupComponent(props: any) {
  return (
    <Popup
      eventHandlers={{
        click: () => {
          console.log('hopefully just one');
        },
      }}
    >
      The weather is
      <HistoricalTempComponent
        position={props.position}
      ></HistoricalTempComponent>
    </Popup>
  );
}
export default PopupComponent;
