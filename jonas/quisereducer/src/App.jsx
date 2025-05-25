import { useEffect, useReducer } from 'react';

import Error from './components/Error';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Question from './components/Question';
import StartScreen from './components/StartScreen';
import Timer from './components/Timer';
import { QUESTIONS_TYPE_ACTIONS, STATUS_DATA } from './utils/constants';

const QUESTIONS_URI = 'http://localhost:3000/questions';

const initialState = {
  questions: [],
  status: STATUS_DATA.Loading,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 30;
function quizReducer(state, action) {
  switch (action.type) {
    case QUESTIONS_TYPE_ACTIONS.DataReceived:
      return { ...state, questions: action.payload, status: STATUS_DATA.Ready };

    case QUESTIONS_TYPE_ACTIONS.DataFailed:
      return { ...state, status: STATUS_DATA.Error };

    case QUESTIONS_TYPE_ACTIONS.Start:
      return {
        ...state,
        status: STATUS_DATA.Active,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case QUESTIONS_TYPE_ACTIONS.NewAnswer: {
      const currentQuestion = state.questions.at(state.index);
      const stateAnswer = action.payload;

      return {
        ...state,
        answer: stateAnswer,
        points:
          stateAnswer === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case QUESTIONS_TYPE_ACTIONS.NextQuestion:
      return { ...state, index: state.index + 1, answer: null };

    case QUESTIONS_TYPE_ACTIONS.Finish: {
      const highscore = Math.max(state.highscore, state.points);
      return { ...state, status: STATUS_DATA.Finished, highscore };
    }

    case QUESTIONS_TYPE_ACTIONS.Restart:
      return {
        ...initialState,
        status: STATUS_DATA.Ready,
        questions: state.questions,
        highscore: state.highscore,
      };

    case QUESTIONS_TYPE_ACTIONS.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:
          state.secondsRemaining === 0 ? STATUS_DATA.Finished : state.status,
      };

    default:
      throw new Error('Action Unknown');
  }
}

function App() {
  // state
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    status,
    questions,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, currQuestion) => acc + currQuestion.points,
    0
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchQuestions() {
      try {
        const response = await fetch(QUESTIONS_URI, {
          signal: abortController.signal,
        });
        const data = await response.json();

        dispatch({ type: QUESTIONS_TYPE_ACTIONS.DataReceived, payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: QUESTIONS_TYPE_ACTIONS.DataFailed });
      }
    }

    fetchQuestions();

    return () => {
      abortController.abort();
    };
  }, []);

  console.log({ status, questions, answer, points, highscore });

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === STATUS_DATA.Loading && <Loader />}
        {status === STATUS_DATA.Error && <Error />}
        {status === STATUS_DATA.Ready && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === STATUS_DATA.Active && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
              highscore={highscore}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === STATUS_DATA.Finished && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
