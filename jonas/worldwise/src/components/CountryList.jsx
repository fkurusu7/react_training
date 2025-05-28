/* eslint-disable react/prop-types */
import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );

  const countries = cities?.reduce((countries, city) => {
    if (countries.map((country) => country.name).includes(city.country)) {
      return countries;
    } else {
      return [
        ...countries,
        { name: city.country, emoji: city.emoji, id: city.id },
      ];
    }
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
