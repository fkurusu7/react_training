/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();

// use this provider as a top-level component
function CitiesProvider({ children }) {
  const CITIES_URI = 'http://localhost:3000/cities';
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [errorCities, setErrorCities] = useState(undefined);

  const [currentCity, setCurrentCity] = useState({});
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingCityCreate, setIsLoadingCityCreate] = useState(false);
  const [errorCityCreate, setErrorCityCreate] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCities = async () => {
      try {
        setIsLoadingCities((curState) => !curState);
        const response = await fetch(CITIES_URI, {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Error fetching cities');

        const data = await response.json();
        setCities(data);
      } catch (err) {
        setErrorCities(err.message);
      } finally {
        setIsLoadingCities((curState) => !curState);
      }
    };

    fetchCities();

    return () => {
      abortController.abort();
    };
  }, []);

  async function getCity(id) {
    const abortController = new AbortController();
    try {
      setIsLoadingCity(true);
      const response = await fetch(`${CITIES_URI}/${id}`, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Error fetching City data');
      }

      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error.message);
      abortController.abort();
    } finally {
      setIsLoadingCity(false);
    }
  }

  async function createCity(newCity) {
    const abortController = new AbortController();
    try {
      setIsLoadingCityCreate(true);
      const response = await fetch(CITIES_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
        signal: abortController.signal,
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error);
      setErrorCityCreate(error.message);
    } finally {
      setIsLoadingCityCreate(false);
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`${CITIES_URI}/${id}`, {
        method: 'DELETE',
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.log(error);
      alert('Error deleting city');
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoadingCities,
        errorCities,
        currentCity,
        getCity,
        isLoadingCity,
        createCity,
        isLoadingCityCreate,
        errorCityCreate,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CitiesContext was used outside of CitiesProvider.');

  return context;
}

export { CitiesProvider, useCities };
