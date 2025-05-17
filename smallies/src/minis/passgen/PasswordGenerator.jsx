import { useState } from 'react';

const settingsInitialState = {
  length: 20,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};
function PasswordGenerator() {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [settingsData, setSettingsData] = useState(settingsInitialState);

  const handleSettingsChange = (ev) => {
    const { id, value, checked } = ev.target;
    if (id === 'length') {
      setSettingsData((currentState) => ({ ...currentState, [id]: +value }));
    } else {
      setSettingsData((currentState) => ({ ...currentState, [id]: checked }));
    }
  };

  const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const getRandomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  const getRandomSymbol = () => {
    const symbols = '!@#$%&/()=?¿[]{}()<>,.^';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };
  const getPasswordFn = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
  };

  const handleGeneratePassword = () => {
    let tmpGeneratedPassword = '';

    const typeCount =
      settingsData.lowercase +
      settingsData.uppercase +
      settingsData.numbers +
      settingsData.symbols;

    if (typeCount === 0) return '';

    const typesArray = [
      { lowercase: settingsData.lowercase },
      { uppercase: settingsData.uppercase },
      { numbers: settingsData.numbers },
      { symbols: settingsData.symbols },
    ]
      .sort(() => Math.random() - 0.5)
      .filter((type) => Object.values(type)[0]);

    for (let i = 0; i < settingsData.length; i += typeCount) {
      typesArray.forEach((type) => {
        const fn = Object.keys(type)[0];
        tmpGeneratedPassword += getPasswordFn[fn]();
      });
    }
    setGeneratedPassword(tmpGeneratedPassword.slice(0, settingsData.length));
  };

  return (
    <div className='passwordg'>
      <h1>Password Generator</h1>
      <section className='container'>
        <div className='result__container'>
          <input
            className='result'
            id='result'
            value={generatedPassword}
            onChange={() => {}}
          />
          <button type='button' id='clipboard'>
            Copy
          </button>
        </div>
        <div className='settings'>
          <div className='setting'>
            <label htmlFor='length'>Password Length</label>
            <input
              type='number'
              name='length'
              id='length'
              min={8}
              max={20}
              value={settingsData.length}
              onChange={(ev) => handleSettingsChange(ev)}
            />
          </div>
          <div className='setting'>
            <label htmlFor='uppercase'>Include Uppercase letters</label>
            <input
              type='checkbox'
              name='uppercase'
              id='uppercase'
              checked={settingsData.uppercase}
              onChange={(ev) => handleSettingsChange(ev)}
            />
          </div>
          <div className='setting'>
            <label htmlFor='lowercase'>Include Lowercase letters</label>
            <input
              type='checkbox'
              name='lowercase'
              id='lowercase'
              checked={settingsData.lowercase}
              onChange={(ev) => handleSettingsChange(ev)}
            />
          </div>
          <div className='setting'>
            <label htmlFor='numbers'>Include Numbers</label>
            <input
              type='checkbox'
              name='numbers'
              id='numbers'
              checked={settingsData.numbers}
              onChange={(ev) => handleSettingsChange(ev)}
            />
          </div>
          <div className='setting'>
            <label htmlFor='symbols'>Include Symbols</label>
            <input
              type='checkbox'
              name='symbols'
              id='symbols'
              checked={settingsData.symbols}
              onChange={(ev) => handleSettingsChange(ev)}
            />
          </div>
        </div>
        <button
          type='button'
          id='generate'
          className='btn'
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>
      </section>
    </div>
  );
}

export default PasswordGenerator;
