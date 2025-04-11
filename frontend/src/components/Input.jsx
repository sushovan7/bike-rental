function Input({ type, placeholder, onChange, id, value, startIcon, endIcon }) {
  return (
    <div className="border flex items-center gap-3 border-gray-600 rounded px-2 py-1">
      <div>{startIcon}</div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="outline-none border-none"
        value={value}
        id={id}
      />
      <div>{endIcon}</div>
    </div>
  );
}

export default Input;
