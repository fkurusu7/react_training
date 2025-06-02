// import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/bootstrap.custom.css';
import './assets/index.css';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route index={true} path='/' element={<HomePage />} />
//     </Route>
//   )
// );

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>
);
