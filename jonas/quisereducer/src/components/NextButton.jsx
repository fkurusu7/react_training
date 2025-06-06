import { ACTION_TYPE } from '../utils/constants';

function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTION_TYPE.NextQuestion })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: ACTION_TYPE.Finish })}
      >
        Finish
      </button>
    );
}

export default NextButton;
