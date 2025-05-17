import { useEffect, useRef, useState } from 'react';

const CHECKOUT_STEPS_DATA = [
  {
    name: 'Customer Info',
    Component: () => <div>Provide your contact details</div>,
  },
  {
    name: 'Shipping Info',
    Component: () => <div>Provide your shpping address</div>,
  },
  {
    name: 'Payment Info',
    Component: () => <div>Complete Payment for your order</div>,
  },
  {
    name: 'Checking Out',
    Component: () => <div>Your order has been placed</div>,
  },
];

function Stepper() {
  return (
    <div className='steps'>
      <h1>Checkout</h1>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS_DATA} />
    </div>
  );
}

function CheckoutStepper({ stepsConfig = [] }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  const calcProgressWidth = () => {
    const width = ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
    console.log(width);
    return width;
  };

  const handleNext = () => {
    setCurrentStep((currentStepState) => {
      if (currentStepState === stepsConfig.length) {
        setIsCompleted(true);
        return currentStep;
      } else {
        return currentStep + 1;
      }
    });
  };

  return (
    <>
      <section className='steps__container'>
        {stepsConfig.map((step, idx) => (
          <article
            key={step.name + idx}
            className='steps__step'
            ref={(el) => (stepRef.current[idx] = el)}
          >
            <span
              className={`steps__step-number 
                ${currentStep > idx + 1 || isCompleted ? 'completed' : ''} 
                ${currentStep === idx + 1 ? 'active' : ''}`}
            >
              {currentStep > idx + 1 || isCompleted ? (
                <span>&#10003;</span>
              ) : (
                idx + 1
              )}
            </span>
            <span className='steps__step-name'>{step.name}</span>
          </article>
        ))}
        <div
          className='steps__progress-bar'
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className='steps__progress'
            style={{ width: `${calcProgressWidth()}%` }}
          ></div>
        </div>
      </section>
      <ActiveComponent />
      {!isCompleted && (
        <button type='button' onClick={handleNext}>
          {currentStep >= stepsConfig.length ? 'Finish' : 'Next'}
        </button>
      )}
    </>
  );
}
export default Stepper;
