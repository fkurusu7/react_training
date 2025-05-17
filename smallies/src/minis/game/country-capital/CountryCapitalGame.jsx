import { useState } from 'react';

function CountryCapitalGame() {
  const data = { Germany: 'Berlin', Azerbaijan: 'Baku' };

  // [{value: "", state: "SELECTED | DEFAULT | WRONG"}]
  const [options, setOptions] = useState(
    [...Object.keys(data), ...Object.values(data)]
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        value,
        state: 'DEFAULT',
      }))
  );
  const [selected, setSelected] = useState(undefined);

  return (
    <div className='gamecc'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          className={`gamecc__btn  
            ${option.state === 'DEFAULT' ? 'default' : ''}
            ${option.state === 'WRONG' ? 'wrong' : ''}
            ${option.state === 'SELECTED' ? 'selected' : ''}`}
          onClick={() => {
            if (!selected) {
              setSelected;
            }
            setOptions(
              options.map((opt) =>
                opt === option ? { ...opt, state: 'SELECTED' } : opt
              )
            );
          }}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
}

export default CountryCapitalGame;
