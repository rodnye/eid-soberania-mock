import { useState } from 'react';
import { PasswordField, TextField } from '../../components/TextField';
import { BackLink } from '../../components/BackLink';
import { useTitle } from '../../hooks/useTitle';
import { SubmitButton } from '../../components/SubmitButton';

export const RegistrationRoute = () => {
  useTitle('Crear cuenta');
  const [userField, setUserField] = useState('');
  const [passField, setPassField] = useState('');

  return (
    <>
      <p className="m-3 text-center text-sm text-gray-400">
        Los campos con el símbolo (*) son obligatorios.
      </p>
      <div className="mt-12 w-full space-y-6">
        <TextField
          onChange={(e) => setUserField(e.target.value)}
          value={userField}
          placeholder="Introduzca celular o correo electrónico*"
        />
        <PasswordField
          onChange={(e) => setPassField(e.target.value)}
          value={passField}
          placeholder="Contraseña*"
        />
        <PasswordField
          onChange={(e) => setPassField(e.target.value)}
          value={passField}
          placeholder="Confirmar contraseña*"
        />
        <TextField
          onChange={(e) => setUserField(e.target.value)}
          value={userField}
          placeholder="Nombre*"
        />
        <TextField
          onChange={(e) => setUserField(e.target.value)}
          value={userField}
          placeholder="Apellidos*"
        />
      </div>

      <SubmitButton>Crear cuenta</SubmitButton>

      <BackLink to="/login-actions/authenticate">Ya tengo cuenta</BackLink>
    </>
  );
};
