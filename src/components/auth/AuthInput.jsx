export default function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-green-600
          focus:ring-2
          focus:ring-green-100
        "
      />
    </div>
  );
}
