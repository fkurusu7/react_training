import { useEffect, useReducer } from 'react';
import Error from './components/Error';
import FinishedScreen from './components/FinishedScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Question from './components/Question';
import StartScreen from './components/StartScreen';
import Timer from './components/Timer';
import { ACTION_TYPE, STATUS_STATE } from './utils/constants';

const QUESTIONS_URI = 'http://localhost:3000/questions';

const initialState = {
  questions: [],
  status: STATUS_STATE.Loading,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 15;

function quizReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.DataReceived:
      return { ...state, questions: payload, status: STATUS_STATE.Ready };
    case ACTION_TYPE.DataFailed:
      return { ...state, status: STATUS_STATE.Error };
    case ACTION_TYPE.Start:
      return {
        ...state,
        status: STATUS_STATE.Active,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case ACTION_TYPE.NewAnswer: {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    case ACTION_TYPE.NextQuestion:
      return { ...state, index: state.index++, answer: null };
    case ACTION_TYPE.Finish:
      return {
        ...state,
        status: STATUS_STATE.Finished,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ACTION_TYPE.Restart:
      return {
        ...initialState,
        questions: state.questions,
        status: STATUS_STATE.Ready,
        highscore: state.highscore,
      };
    case ACTION_TYPE.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:
          state.secondsRemaining === 0 ? STATUS_STATE.Finished : state.status,
      };

    default:
      throw new Error('Unknown Action Type');
  }
}

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (points, currQ) => points + currQ.points,
    0
  );

  useEffect(() => {
    const abortController = new AbortController();
    const fetchQuestions = async () => {
      try {
        const response = await fetch(QUESTIONS_URI, {
          signal: abortController.signal,
        });
        const data = await response.json();
        dispatch({ type: ACTION_TYPE.DataReceived, payload: data });
      } catch (error) {
        console.log(error.message);
        dispatch({ type: ACTION_TYPE.DataFailed });
      }
    };

    fetchQuestions();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === STATUS_STATE.Loading && <Loader />}
        {status === STATUS_STATE.Error && <Error />}
        {status === STATUS_STATE.Ready && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === STATUS_STATE.Active && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === STATUS_STATE.Finished && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
