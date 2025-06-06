import { ACTION_TYPE } from '../utils/constants';

function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className='result'>
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} Points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTION_TYPE.Restart })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
