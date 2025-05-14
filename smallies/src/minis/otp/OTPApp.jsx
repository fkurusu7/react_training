import { useEffect, useRef, useState } from 'react';

const OTPApp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handlePhoneNumber = (ev) => setPhoneNumber(ev.target.value);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setShowOTP(true);
    setPhoneNumber('');
  };

  const handleOTPSubmit = (otpCode) => {
    console.log(otpCode);
  };

  return (
    <div className='otp'>
      <h1>Sign in with Phone</h1>
      {showOTP ? (
        <OTP length={4} onOTPSubmit={handleOTPSubmit} setShowOTP={setShowOTP} />
      ) : (
        <form className='otp__phoneform' onSubmit={handleSubmit}>
          <input
            type='text'
            name='phone'
            id='phone'
            autoFocus
            placeholder='Enter Phone Number'
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
          <button type='submit'>Sign in</button>
        </form>
      )}
    </div>
  );
};

function OTP({ length = 4, onOTPSubmit = () => {}, setShowOTP = () => {} }) {
  const [otpInputs, setOtpInputs] = useState(Array.from({ length }).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleChange = (idx, ev) => {
    const value = ev.target.value;
    if (isNaN(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[idx] = value.substring(value.length - 1);
    setOtpInputs(newOtpInputs);

    // Move to next input if current field is populated
    if (value && idx < length - 1 && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (idx, ev) => {
    if (
      ev.key === 'Backspace' &&
      !otpInputs[idx] &&
      idx > 0 &&
      inputRefs.current[idx - 1]
    ) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleClick = (idx) => {
    inputRefs.current[idx].setSelectionRange(1, 1);

    // move to the first empty input
    if (idx > 0 && !otpInputs[idx - 1])
      inputRefs.current[otpInputs.indexOf('')].focus();
  };

  const handleSubmit = () => {
    // when all values in otp inputs are populated
    const combinedOTPCode = otpInputs.join('');
    if (combinedOTPCode.length === length) {
      onOTPSubmit(combinedOTPCode); // simulate API call
      setShowOTP(false);
    }
  };

  return (
    <div className='otp__container'>
      <h2>Enter sent OTP number</h2>
      <div className='otp__inputs'>
        {otpInputs.map((val, idx) => (
          <input
            key={idx}
            type='text'
            className='otp__input'
            ref={(input) => (inputRefs.current[idx] = input)}
            value={val}
            onChange={(ev) => handleChange(idx, ev)}
            onClick={() => handleClick(idx)}
            onKeyDown={(ev) => handleKeyDown(idx, ev)}
          />
        ))}
      </div>
      <div className='otp__submits'>
        <button type='button' onClick={() => setShowOTP(false)}>
          Cancel
        </button>
        <button
          type='button'
          onClick={() => {
            setOtpInputs(Array.from({ length }).fill(''));
            inputRefs.current[0].focus();
          }}
        >
          Clear OTPs
        </button>
        <button type='button' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default OTPApp;
