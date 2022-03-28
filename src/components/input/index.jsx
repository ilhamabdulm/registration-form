import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const { input, input_error } = styles;

const Input = (props) => {
  const {
    label,
    type = 'text',
    name,
    placeholder,
    value = '',
    onChange = (v) => {},
    disabled = false,
    number = false,
    color = 'default',
    error,
  } = props;
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    console.log(isTouched);
  }, [isTouched]);

  return (
    <div className={input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e) => {
          const regex = /^\d*[.]?\d*$/;

          if (number) {
            if (regex.test(e.target.value)) {
              onChange(e);
            } else {
              return;
            }
          } else {
            onChange(e);
          }
        }}
        value={value}
        disabled={disabled}
        data-color={color}
        onFocus={() => setIsTouched(true)}
        onBlur={() => setIsTouched(false)}
        data-error={`${error?.state}`}
      />
      {error?.state && <span className={input_error}>{error?.message}</span>}
    </div>
  );
};

export default Input;
