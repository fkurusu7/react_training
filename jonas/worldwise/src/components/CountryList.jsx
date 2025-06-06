/* eslint-disable react/prop-types */
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  if (isLoading && !cities.length) return <Spinner />;
  if (!cities.length) return <Message message='Add your first city' />;

  // [
  //  {"country": "Spain", "emoji": "🇪🇸",},
  //  {"country": "Panama", "emoji": "🇪🇸",}
  // ]
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((c) => c.name).includes(city.country))
      return [...arr, { name: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.name} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
