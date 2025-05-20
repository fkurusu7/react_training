import { useState } from 'react';

function TextExpander({
  children,
  className = '',
  collapsedNumWords = 10,
  collapseButtonText = 'Show Less',
  expandButtonText = 'Show more',
  buttonColor = '#fff',
  expanded = true,
}) {
  const [showText, setShowText] = useState(expanded);

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: buttonColor,
    cursor: 'pointer',
    marginLeft: '1rem',
  };

  const collapseText = () =>
    children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';

  return (
    <div className={className}>
      <span>{showText ? collapseText() : children}</span>
      <button
        type='button'
        style={buttonStyle}
        onClick={() => setShowText(!showText)}
      >
        {showText ? expandButtonText : collapseButtonText}
      </button>
    </div>
  );
}

function TextExpanderApp() {
  return (
    <div className='text__container'>
      <TextExpander>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ea
        aperiam recusandae accusantium hic dolore beatae magni officia optio
        est? Debitis harum laudantium voluptas impedit, odit fugit assumenda
        blanditiis ea porro! Dolor itaque voluptates nemo facilis dolorum sed.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText='Show Text'
        collapseButtonText='Colapse Text'
        buttonColor='#ff6622'
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ea
        aperiam recusandae accusantium hic dolore beatae magni officia optio
        est? Debitis harum laudantium voluptas impedit, odit fugit assumenda
        blanditiis ea porro! Dolor itaque voluptates nemo facilis dolorum sed.
      </TextExpander>

      <TextExpander expanded={false} className='box'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
        molestias ipsam possimus deleniti perspiciatis veritatis totam suscipit
        maiores aperiam! Modi optio praesent.
      </TextExpander>
    </div>
  );
}
export default TextExpanderApp;
