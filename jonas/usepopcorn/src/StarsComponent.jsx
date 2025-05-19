import { useState } from 'react';
import StarRating from './StarRating';

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color='#ff00d0' maxRating={11} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

function StarsComponent() {
  return (
    <div>
      <StarRating
        maxRating={5}
        defaultRating={3}
        messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amaizing']}
      />
      <StarRating maxRating={8} color='#8add30' defaultRating={4} />
      <StarRating color='#77f6ff' size={20} />
      <StarRating
        size={30}
        defaultRating={5}
        messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amaizing']}
      />
      <Test />
    </div>
  );
}

export default StarsComponent;
