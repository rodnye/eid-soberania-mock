interface SubmitButtonProps {
  onClick?: () => void;
  children?: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  onClick = () => {},
  children = 'Aceptar',
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`my-6 w-full rounded-full p-2 text-center text-white uppercase ${
        disabled
          ? 'cursor-not-allowed bg-blue-300'
          : 'bg-blue-950 hover:bg-blue-900'
      }`}
    >
      {children}
    </button>
  );
};
