/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const CitiesContext = createContext();
const CITIES_URI = 'http://localhost:3000/cities';

const citiesInitialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

const ACTION_TYPES = {
  Loading: 'loading',
  Loaded: 'cities/loaded',
  City: 'city/loaded',
  Create: 'city/create',
  Delete: 'city/delete',
  Rejected: 'rejected',
};

function citiesReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.Loading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.Loaded:
      return { ...state, cities: payload, isLoading: false };
    case ACTION_TYPES.City:
      return { ...state, currentCity: payload, isLoading: false };
    case ACTION_TYPES.Create:
      return { ...state, isLoading: false, cities: [...state.cities, payload] };
    case ACTION_TYPES.Delete:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
        currentCity: {},
      };
    case ACTION_TYPES.Rejected:
      return { ...state, error: payload, isLoading: false };

    default:
      throw new Error('Unkown action type');
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(citiesReducer, citiesInitialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: ACTION_TYPES.Loading });
        const response = await fetch(CITIES_URI);

        const data = await response.json();

        dispatch({ type: ACTION_TYPES.Loaded, payload: data });
      } catch (error) {
        console.error('Fetch error:', error);
        alert(`Error: ${error.message}`);
        dispatch({
          type: ACTION_TYPES.Rejected,
          payload: 'Error loading cities',
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function (cityId) {
      try {
        if (+cityId === currentCity.id) return;

        dispatch({ type: ACTION_TYPES.Loading });
        const response = await fetch(`${CITIES_URI}/${cityId}`);
        const data = await response.json();

        dispatch({ type: ACTION_TYPES.City, payload: data });
      } catch (error) {
        console.error('Fetch error:', error);
        alert(`Error: ${error.message}`);
        dispatch({
          type: ACTION_TYPES.Rejected,
          payload: 'Error loading cities',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: ACTION_TYPES.Loading });
      const response = await fetch(CITIES_URI, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(newCity),
      });
      const data = await response.json();

      dispatch({ type: ACTION_TYPES.Create, payload: data });
    } catch (error) {
      console.error('Create City error:', error);
      alert(`Error: ${error.message}`);
      dispatch({
        type: ACTION_TYPES.Rejected,
        payload: 'Error loading cities',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: ACTION_TYPES.Loading });
      await fetch(`${CITIES_URI}/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: ACTION_TYPES.Delete, payload: id });
    } catch (error) {
      console.error('Create City error:', error);
      alert(`Error: ${error.message}`);
      dispatch({
        type: ACTION_TYPES.Rejected,
        payload: 'Error loading cities',
      });
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
