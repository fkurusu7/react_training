import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      type='back'
      onClick={(ev) => {
        ev.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
