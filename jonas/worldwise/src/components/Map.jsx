/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCitiesContext } from '../contexts/CitiesContext';
import useGeolocation from '../hooks/useGeolocation';
import useUrlPosition from '../hooks/useUrlPosition';
import Button from './Button';
import styles from './Map.module.css';

function Map() {
  const { cities } = useCitiesContext();
  const {
    isLoading,
    position: geoPosition,
    getPosition,
    error: errorGeoposition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button
          type='position'
          onClick={getPosition}
          disable={errorGeoposition}
        >
          {isLoading
            ? 'loading...'
            : !errorGeoposition
            ? 'Use your position'
            : errorGeoposition}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={4}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (ev) => {
      console.log('EV, ', ev.latlng);
      navigate(`form?lat=${ev.latlng.lat}&lng=${ev.latlng.lng}`);
    },
  });
}

export default Map;
