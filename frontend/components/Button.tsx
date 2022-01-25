import React, { FC, MouseEventHandler } from 'react';

import styles from '../styles/Button.module.css';

type ButtonProps = {
  label: string;
  onClick: MouseEventHandler;
  largeWidth: boolean;
};

const Button: FC<ButtonProps> = ({ label, onClick, largeWidth }) => {
  return (
    <button
      onClick={onClick}
      className={largeWidth ? styles.largeWidthButton : styles.smallWidthButton}
    >
      {label}
    </button>
  );
};

export default Button;
