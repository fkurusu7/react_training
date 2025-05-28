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
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Button from './Button';
import styles from './Map.module.css';
import Spinner from './Spinner';

function Map() {
  const { cities } = useCities();
  const {
    isLoading,
    position: geoLocation,
    error: geoError,
    getPosition,
  } = useGeolocation();

  const { latMap, lngMap } = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (latMap && lngMap) setMapPosition([latMap, lngMap]);
  }, [latMap, lngMap]);

  useEffect(() => {
    if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
  }, [geoLocation]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type='position' onClick={getPosition}>
          {isLoading ? <Spinner /> : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
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
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
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
      navigate(`form?lat=${ev.latlng.lat}&lng=${ev.latlng.lng}`);
    },
  });
}

export default Map;
