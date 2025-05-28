/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { formatDate } from '../utils/helpers';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const {
    emoji,
    cityName,
    date,
    id,
    position: { lat, lng },
  } = city;

  function handleClick(ev) {
    ev.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
