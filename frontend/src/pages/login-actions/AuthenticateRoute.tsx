import { useState } from 'react';
import { PasswordField, TextField } from '../../components/TextField';
import { Link } from '../../components/Link';
import { useTitle } from '../../hooks/useTitle';
import { SubmitButton } from '../../components/SubmitButton';

export const AuthenticateRoute = () => {
  useTitle('Iniciar Sesión');
  const [userField, setUserField] = useState('');
  const [passField, setPassField] = useState('');
  const [persistCheck, setPersistCheck] = useState(true);

  return (
    <>
      <div className="mt-12 w-full space-y-6">
        <TextField
          onChange={(e) => setUserField(e.target.value)}
          value={userField}
          placeholder="Introduzca celular o correo electrónico"
        />
        <PasswordField
          onChange={(e) => setPassField(e.target.value)}
          value={passField}
          placeholder="Introduzca su contraseña"
        />
        <div className="m-6 flex items-center justify-between">
          <label htmlFor="connect-check" className="cursor-pointer space-x-1">
            <input
              id="connect-check"
              type="checkbox"
              checked={persistCheck}
              onChange={(e) => setPersistCheck(e.target.checked)}
            />
            <span>Seguir conectado</span>
          </label>

          <Link to="/login-actions/reset-credentials">
            Olvidé mi contraseña
          </Link>
        </div>

        <SubmitButton>Iniciar Sesión</SubmitButton>
      </div>

      <p>
        <span className="text-red-600">¿No tienes una cuenta? </span>
        <Link to="/login-actions/registration">Cree una cuenta</Link>
      </p>
    </>
  );
};
