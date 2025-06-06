export const STATUS_STATE = Object.freeze({
  Loading: 'loading',
  Error: 'error',
  Ready: 'ready',
  Active: 'active',
  Finished: 'finished',
});

export const ACTION_TYPE = Object.freeze({
  DataReceived: 'dataReceived',
  DataFailed: 'dataFailed',
  Start: 'start',
  NewAnswer: 'newAnswer',
  NextQuestion: 'nextQuestion',
  Finish: 'finish',
  Restart: 'restart',
  Tick: 'tick',
});
