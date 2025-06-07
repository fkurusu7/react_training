/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApp } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthApp();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
