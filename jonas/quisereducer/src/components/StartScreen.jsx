import { ACTION_TYPE } from '../utils/constants';

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className='start'>
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        type='button'
        className='btn'
        onClick={() => dispatch({ type: ACTION_TYPE.Start })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
