import styles from './styles.module.scss';

const { input } = styles;

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
  } = props;

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
      />
    </div>
  );
};

export default Input;
