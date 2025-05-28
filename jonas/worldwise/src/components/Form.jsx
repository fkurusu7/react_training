/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../hooks/useUrlPosition';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useCities } from '../contexts/CitiesContext';
import { convertToEmoji } from '../utils/helpers';
import Button from './Button';
import ButtonBack from './ButtonBack';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

function Form() {
  const POSITION_GEOCODE_URL =
    'https://api.bigdatacloud.net/data/reverse-geocode-client';
  const navigate = useNavigate();

  const { latMap, lngMap } = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState(undefined);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');

  const { createCity, isLoadingCityCreate, errorCityCreate } = useCities();

  useEffect(() => {
    const abortController = new AbortController();
    if (!latMap && !lngMap) return;

    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError(undefined);
        const response = await fetch(
          `${POSITION_GEOCODE_URL}?latitude=${latMap}&longitude=${lngMap}`,
          { signal: abortController.signal }
        );
        if (!response.ok) throw new Error('Error fetching Position Geocode');

        const data = await response.json();
        if (!data.countryCode)
          throw new Error('Not a city, click somewhere else');

        // console.log(data);
        setCityName(data.city || data.locality || '');
        setCountry(data.country);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        if (error.message !== 'signal is aborted without reason') {
          console.log(error);
          setGeocodingError(error.message);
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();

    return () => abortController.abort();
  }, [latMap, lngMap]);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      date,
      country,
      emoji,
      notes,
      position: { lat: latMap, lng: lngMap },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  if (geocodingError) return <Message message={geocodingError} />;

  if (!latMap && !lngMap)
    return <Message message='Click somewhere on the Map' />;

  if (isLoadingGeocoding) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoadingCityCreate ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        {/* <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
          /> */}
        <DatePicker
          id='date'
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
