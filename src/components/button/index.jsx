export const PrimaryButton = ({
  text,
  type = 'button',
  className = '',
  primaryClassName = 'btn btn-primary',
  handleClick,
  disabled
}) => {
  return (
    <button
      type={type}
      className={`${primaryClassName} ${className}`}
      onClick={handleClick}
      disabled={disabled}>
      {text}
    </button>
  );
};
