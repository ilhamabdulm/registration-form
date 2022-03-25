import joinClasses from 'utils/join-classes';
import styles from './styles.module.scss';

const { root } = styles;

const Button = (props) => {
  const {
    type = 'button',
    children,
    variant = 'primary', // primary | secondary | tertiary
    prefixIcon = null,
    suffixIcon = null,
    onClick = () => {},
    disabled = false,
    size = 'normal', // small | normal (default) | medium | large
    bordered = false,
    className = '',
    danger = false,
    full,
  } = props;
  const classes = joinClasses([root, styles[variant], className]);

  return (
    <button
      type={type}
      danger={`${danger}`}
      className={classes}
      onClick={() => onClick()}
      disabled={disabled}
      data-size={size}
      data-bordered={`${bordered}`}
      full={full ? 'true' : null}
    >
      {prefixIcon ? prefixIcon : null}
      {children}
      {suffixIcon ? suffixIcon : null}
    </button>
  );
};

export default Button;
