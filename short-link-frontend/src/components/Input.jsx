import PropTypes from "prop-types";

function Input({
  formik,
  id,
  name,
  type = "text",
  placeholder = "",
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      <input
        type={type}
        id={id}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  formik: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
