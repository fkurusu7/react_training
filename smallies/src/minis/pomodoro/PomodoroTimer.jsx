import { useCallback, useEffect, useReducer } from 'react';

const INITIAL_TIME = 10; // 25 minutes
const INITIAL_BREAK_TIME = 5; // 5 minutes
const FOCUS = 'focus';
const BREAK = 'break';

const pomodoroInitialState = {
  time: INITIAL_TIME,
  mode: FOCUS,
  isRunning: false,
  cycles: 0,
};

const ACTION_TYPES = {
  Running: 'running',
  Start: 'start',
  Pause: 'pause',
  Focus: 'focus',
  Break: 'break',
  End: 'end',
  Reset: 'reset',
};
function pomodoroReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.Running:
      return { ...state, isRunning: payload };
    case ACTION_TYPES.Start:
      return { ...state, time: state.time - 1, isRunning: true };
    case ACTION_TYPES.Pause:
      return { ...state, time: state.time, isRunning: false };
    case ACTION_TYPES.Focus:
      return {
        ...state,
        mode: FOCUS,
        time: INITIAL_TIME,
        cycles: state.cycles++,
      };
    case ACTION_TYPES.Break:
      return {
        ...state,
        mode: BREAK,
        time: INITIAL_BREAK_TIME,
        isRunning: true,
      };
    case ACTION_TYPES.End:
      return { ...state, time: 0 };
    case ACTION_TYPES.Reset:
      return {
        ...state,
        time: INITIAL_TIME,
        mode: FOCUS,
        isRunning: false,
        cycles: 0,
      };

    default:
      throw new Error('Unkown action type');
  }
}

function PomodoroTimer() {
  const [state, dispatch] = useReducer(pomodoroReducer, pomodoroInitialState);
  const { time, mode, isRunning, cycles } = state;

  const handleTimerEnd = useCallback(
    function () {
      dispatch({ type: ACTION_TYPES.Running, payload: false });
      console.log('Mode in TimerEnd', mode);
      if (mode === FOCUS) {
        dispatch({ type: ACTION_TYPES.Break });
      } else if (mode === BREAK) {
        dispatch({ type: ACTION_TYPES.Focus });
      }
    },
    [mode]
  );

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch({ type: ACTION_TYPES.Start });
        if (time === 1) {
          console.log('About to END...');
          handleTimerEnd();
          dispatch({ type: ACTION_TYPES.End });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [handleTimerEnd, isRunning, time]);

  function formatTime() {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, 0);
    return `${minutes}:${seconds}`;
  }

  function handleReset() {
    dispatch({ type: ACTION_TYPES.Reset });
  }

  return (
    <div className='pomodoro__container'>
      <h1>Pomodoro Timer</h1>
      <h2>{mode === FOCUS ? 'Focus Time' : ' Break Time'}</h2>
      <p>{formatTime()}</p>
      <section>
        <button
          onClick={() => {
            if (isRunning) {
              console.log('about to pause');
              dispatch({ type: ACTION_TYPES.Pause });
            } else {
              dispatch({ type: ACTION_TYPES.Start });
            }
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </section>
      <p>Pomodoros Completed: {cycles}</p>
    </div>
  );
}

export default PomodoroTimer;
