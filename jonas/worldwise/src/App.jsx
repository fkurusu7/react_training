import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';

const CITIES_URI = 'http://localhost:3000/cities';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(CITIES_URI, {
          signal: abortController.signal,
        });

        const data = await response.json();

        setCities(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch was aborted');
          return; // Don't show error message for intentional aborts
        }
        console.error('Fetch error:', error);
        alert(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='products' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<Navigate to='cities' replace />} />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='cities/:id' element={<City />} />
          <Route
            path='countries'
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
