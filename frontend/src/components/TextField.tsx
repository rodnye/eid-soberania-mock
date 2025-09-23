import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  className = '',
  ...props
}: TextFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-6 py-1
        bg-gray-100
        border border-transparent
        rounded-full
        focus:outline-none
        focus:border-blue-500
        focus:ring-1 focus:ring-blue-500
        transition-colors duration-200
        ${className}
      `}
      {...props}
    />
  );
};

export const PasswordField = ({ ...props }: Omit<TextFieldProps, 'type'>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <TextField
        type={showPassword ? 'text' : 'password'}
        className="pr-12"
        {...props}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
