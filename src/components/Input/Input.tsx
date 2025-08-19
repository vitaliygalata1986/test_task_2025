import type { InputProps } from './Input.props';

const Input: React.FC<InputProps> = ({
  label,
  name,
  id,
  error,
  value,
  onChange,
  type = 'text',
  required,
  placeholder = ' ',
  hint,
  ...rest
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          block px-4 py-3.5 w-full text-base text-[var(--text-black-color)] bg-transparent appearance-none
          focus:outline-none focus:ring-0 peer rounded-[4px]
          ${
            error
              ? 'border-[var(--border-input-invalid)] border-2 focus:border-[var(--border-input-invalid)]'
              : 'border-[var(--border-input-enabled)] border-[1px] focus:border-[var(--border-input-enabled)]'
          }
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-base text-[var(--text-input-color)] duration-300 transform -translate-y-3.5 top-1.5 left-4 origin-[0]
          peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3.5 peer-focus:text-xs
          bg-[var(--background-color)] px-1 z-10
          ${
            error
              ? 'text-[var(--border-input-invalid)] peer-focus:text-[var(--border-input-invalid)]'
              : 'text-[var(--text-input-color)] peer-focus:text-[var(--text-input-color)]'
          }
        `}
      >
        {label}
      </label>
      {hint && (
        <p className="text-sm text-[var(--text-input-color)] mt-1 pl-4">
          {hint}
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-1 pl-4">{error}</p>}
    </>
  );
};

export default Input;
