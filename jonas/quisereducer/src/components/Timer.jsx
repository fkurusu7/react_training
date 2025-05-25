import { useEffect } from 'react';
import { QUESTIONS_TYPE_ACTIONS } from '../utils/constants';

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: QUESTIONS_TYPE_ACTIONS.Tick });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className='timer'>
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
}

export default Timer;
