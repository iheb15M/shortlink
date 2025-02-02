import PropTypes from "prop-types";

function Button({
  type = "button",
  onClick = () => {},
  className = "",
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white bg-primary-gradient hover:bg-primary-gradient-hover font-semibold px-4 py-2 rounded-full cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
