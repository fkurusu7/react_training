import { useReducer } from 'react';

const reduceInitialState = { step: 1, count: 0 };

const ACTION_TYPES = Object.freeze({
  Increment: 'inc',
  Descrement: 'dec',
  SetCount: 'setCount',
  SetStep: 'setStep',
  Reset: 'reset',
});

function counterReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.Increment:
      return { ...state, count: state.count + state.step };
    case ACTION_TYPES.Descrement:
      return { ...state, count: state.count - state.step };
    case ACTION_TYPES.SetCount:
      return { ...state, count: payload };
    case ACTION_TYPES.SetStep:
      return { ...state, step: payload };
    case ACTION_TYPES.Reset:
      return reduceInitialState;

    default:
      throw new Error('Unkown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(counterReducer, reduceInitialState);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - step);
    dispatch({ type: ACTION_TYPES.Descrement });
  };

  const inc = function () {
    // setCount((count) => count + step);
    dispatch({ type: ACTION_TYPES.Increment });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: ACTION_TYPES.SetCount, payload: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: ACTION_TYPES.SetStep, payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: ACTION_TYPES.Reset });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
