import { BackLink } from '../../components/BackLink';
import { SubmitButton } from '../../components/SubmitButton';
import { TextField } from '../../components/TextField';
import { useTitle } from '../../hooks/useTitle';

export const ResetCredentialsRoute = () => {
  useTitle('Nueva Contraseña');

  return (
    <>
      <p className="max-w-sm">
        Introduzca su celular o correo electrónico y le enviaremos un código
        para generar una nueva contraseña
      </p>

      <div className="my-12 w-full">
        <TextField placeholder="Introduzca celular o correo electrónico" />
      </div>
      <SubmitButton>Enviar</SubmitButton>
      
      <BackLink />
    </>
  );
};
