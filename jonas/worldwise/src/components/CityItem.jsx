/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useCitiesContext } from '../contexts/CitiesContext';
import { formatDate } from '../utils/helpers';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const { emoji, cityName, date, id, position } = city;
  const { currentCity, deleteCity } = useCitiesContext();

  function handleDelete(ev) {
    ev.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles['cityItem--active'] : ''
      }`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
