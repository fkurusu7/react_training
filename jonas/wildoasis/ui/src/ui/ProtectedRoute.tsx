import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrentUser } from '../features/authentication/useCurrentUser';
import Spinner from './Spinner';

const FullPage = styled.div`
  background-color: var(--color-grey-50);
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoadingUser, isAuthenticated } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate('/signin');
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
