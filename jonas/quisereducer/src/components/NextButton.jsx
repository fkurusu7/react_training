import { QUESTIONS_TYPE_ACTIONS } from '../utils/constants';

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: QUESTIONS_TYPE_ACTIONS.NextQuestion })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: QUESTIONS_TYPE_ACTIONS.Finish })}
      >
        Finish
      </button>
    );
}

export default NextButton;
