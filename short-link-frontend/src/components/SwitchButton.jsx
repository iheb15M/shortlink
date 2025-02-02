import PropTypes from "prop-types";

function SwitchButton({ isChecked, onChange }) {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={onChange}
        className="peer hidden"
      />

      <label
        htmlFor="switch"
        className={`w-12 h-6 rounded-full cursor-pointer border-1 border-gray-300 transition-colors duration-500 ease-in-out ${
          isChecked ? "bg-primary-gradient" : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-6 h-6 bg-gray-50 rounded-full transition-transform duration-500 ease-in-out transform ${
            isChecked ? "translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );
}
SwitchButton.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SwitchButton;
