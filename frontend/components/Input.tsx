import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';

import styles from '../styles/Input.module.css';

type InputProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyPress: KeyboardEventHandler<HTMLInputElement>;
  largeWidth: boolean;
};

const Input: FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
  onKeyPress,
  largeWidth,
}) => {
  return (
    <input
      className={largeWidth ? styles.inputLargeWidth : styles.inputSmallWidth}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default Input;
