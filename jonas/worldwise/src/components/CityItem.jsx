/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import styles from './CityItem.module.css';

function CityItem({ city }) {
  const { emoji, cityName, date, id, position } = city;
  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={styles.cityItem}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}

export default CityItem;
