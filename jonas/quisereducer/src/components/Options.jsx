import { QUESTIONS_TYPE_ACTIONS } from '../utils/constants';

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() =>
            dispatch({ type: QUESTIONS_TYPE_ACTIONS.NewAnswer, payload: index })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
