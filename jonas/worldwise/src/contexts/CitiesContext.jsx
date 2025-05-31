/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const CitiesContext = createContext();

const CITIES_URI = 'http://localhost:3000/cities';

const REDUCER_ACTION_TYPES = {
  Loading: 'cities/loading',
  Loaded: 'cities/loaded',
  CityLoaded: 'city/loaded',
  Created: 'city/created',
  Deleted: 'city/deleted',
  Rejected: 'cities/rejected',
  Unknown: 'Unknown action type',
};
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: undefined,
};

// handles business logic, should be pure functions, no api requests
function citiesReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case REDUCER_ACTION_TYPES.Loading:
      return { ...state, isLoading: true };

    case REDUCER_ACTION_TYPES.CityLoaded:
      return { ...state, isLoading: false, currentCity: payload };

    case REDUCER_ACTION_TYPES.Loaded:
      return { ...state, isLoading: false, cities: payload };

    case REDUCER_ACTION_TYPES.Created:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, payload],
        currentCity: payload,
      };

    case REDUCER_ACTION_TYPES.Deleted:
      // payload === to the passed id
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id === payload),
      };

    // Errors
    case REDUCER_ACTION_TYPES.Rejected:
      return { ...state, isLoading: false, error: payload };

    default:
      throw new Error(REDUCER_ACTION_TYPES.Unknown);
  }
}

// use this provider as a top-level component
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(citiesReducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchCities = async () => {
      dispatch({ type: REDUCER_ACTION_TYPES.Loading });

      try {
        const response = await fetch(CITIES_URI, {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Error fetching cities');

        const data = await response.json();

        dispatch({ type: REDUCER_ACTION_TYPES.Loaded, payload: data });
      } catch (err) {
        dispatch({
          type: REDUCER_ACTION_TYPES.Rejected,
          payload: 'There was an error loading data...',
        });
      }
    };

    fetchCities();

    return () => {
      abortController.abort();
    };
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      const abortController = new AbortController();
      try {
        dispatch({ type: REDUCER_ACTION_TYPES.Loading });
        const response = await fetch(`${CITIES_URI}/${id}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error('Error fetching City data');
        }

        const data = await response.json();
        dispatch({ type: REDUCER_ACTION_TYPES.CityLoaded, payload: data });
      } catch (error) {
        abortController.abort();
        dispatch({
          type: REDUCER_ACTION_TYPES.Rejected,
          payload: error.message,
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    const abortController = new AbortController();
    try {
      dispatch({ type: REDUCER_ACTION_TYPES.Loading });
      const response = await fetch(CITIES_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
        signal: abortController.signal,
      });
      const data = await response.json();
      dispatch({ type: REDUCER_ACTION_TYPES.Created, payload: data });
    } catch (error) {
      abortController.abort();
      dispatch({ type: REDUCER_ACTION_TYPES.Rejected, payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`${CITIES_URI}/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: REDUCER_ACTION_TYPES.Deleted, payload: id });
    } catch (error) {
      alert('Error deleting city');
      dispatch({ type: REDUCER_ACTION_TYPES.Rejected, payload: error.message });
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
        error,
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
