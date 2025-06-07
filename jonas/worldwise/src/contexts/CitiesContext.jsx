/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const CitiesContext = createContext();
const CITIES_URI = 'http://localhost:3000/cities';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(CITIES_URI);

        const data = await response.json();

        setCities(data);
      } catch (error) {
        console.error('Fetch error:', error);
        alert(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function (cityId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${CITIES_URI}/${cityId}`);
      const data = await response.json();

      console.log(data);
      setCurrentCity(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch was aborted');
        return;
      }
      console.error('Fetch error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(CITIES_URI, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(newCity),
      });
      const data = await response.json();

      setCities([...cities, data]);
    } catch (error) {
      console.error('Create City error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${CITIES_URI}/${id}`, {
        method: 'DELETE',
      });

      setCities(cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error('Create City error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('CityContext was used outside of CityProvider');

  return context;
}

export { CitiesProvider, useCitiesContext };
