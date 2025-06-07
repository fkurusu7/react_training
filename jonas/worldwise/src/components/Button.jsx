/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './Button.module.css';

function Button({ children, onClick, type, disable = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default Button;
