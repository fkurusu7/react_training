import type React from 'react';
import { HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSignout } from './useSignout';

function Signout() {
  const { signout, isLoadingSignout } = useSignout();

  function handleSignout(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    signout();
  }
  return (
    <ButtonIcon onClick={handleSignout} disabled={isLoadingSignout}>
      {isLoadingSignout ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Signout;
