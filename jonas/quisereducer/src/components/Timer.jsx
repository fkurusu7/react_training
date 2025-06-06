import { useEffect } from 'react';
import { ACTION_TYPE } from '../utils/constants';

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const secondss = Math.floor(secondsRemaining % 60);

  useEffect(() => {
    const idInterval = setInterval(() => {
      dispatch({ type: ACTION_TYPE.Tick });
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [dispatch]);

  return (
    <div className='timer'>
      {minutes < 10 && 0}
      {minutes}:{secondsRemaining < 10 && 0}
      {secondss}
    </div>
  );
}

export default Timer;
