import { ACTION_TYPE } from '../utils/constants';

function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, idx) => (
        <button
          key={idx + 1}
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswer
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswer}
          onClick={() =>
            dispatch({ type: ACTION_TYPE.NewAnswer, payload: idx })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
