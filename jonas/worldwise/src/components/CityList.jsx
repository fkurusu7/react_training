/* eslint-disable react/prop-types */
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CityList({ cities, isLoading }) {
  console.log(isLoading, cities);
  if (isLoading && !cities.length) return <Spinner />;
  if (!cities.length) return <Message message='Add your first city' />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
