export const SubmitButton = ({ onClick = () => {}, children = 'Aceptar' }) => {
  return (
    <button
      onClick={onClick}
      className="my-6 w-full rounded-full bg-blue-950 p-2 text-center text-white uppercase"
    >
      {children}
    </button>
  );
};
