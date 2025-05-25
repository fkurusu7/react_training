function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
  highscore,
}) {
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints ?? 0}
      </p>
      <p className='highscore'>Highscore: {highscore} points</p>
    </header>
  );
}

export default Progress;
