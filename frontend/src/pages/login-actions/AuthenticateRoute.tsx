import { useState } from 'react';
import { PasswordField, TextField } from '../../components/TextField';
import { Link } from '../../components/Link';
import { useTitle } from '../../hooks/useTitle';
import { SubmitButton } from '../../components/SubmitButton';
import { useSearchParams } from 'wouter';

export const AuthenticateRoute = () => {
  useTitle('Iniciar Sesión');
  const [searchParams] = useSearchParams();
  const [userField, setUserField] = useState('');
  const [passField, setPassField] = useState('');
  const [persistCheck, setPersistCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/oauth/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: searchParams.get('client_id'),
          redirectUri: searchParams.get('redirect_uri'),
          scope: searchParams.get('scope'),
          state: searchParams.get('state'),
          cid: userField,
          password: passField,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-12 w-full space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-600">{error}</div>
        )}

        <TextField
          onChange={(e) => setUserField(e.target.value)}
          value={userField}
          placeholder="Introduzca celular o correo electrónico"
          disabled={isLoading}
          required
        />
        <PasswordField
          onChange={(e) => setPassField(e.target.value)}
          value={passField}
          placeholder="Introduzca su contraseña"
          disabled={isLoading}
          required
        />
        <div className="m-6 flex items-center justify-between">
          <label htmlFor="connect-check" className="cursor-pointer space-x-1">
            <input
              id="connect-check"
              type="checkbox"
              checked={persistCheck}
              onChange={(e) => setPersistCheck(e.target.checked)}
              disabled={isLoading}
            />
            <span>Seguir conectado</span>
          </label>

          <Link
            to="/login-actions/reset-credentials"
            className={isLoading ? 'pointer-events-none opacity-50' : ''}
          >
            Olvidé mi contraseña
          </Link>
        </div>

        <SubmitButton disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </SubmitButton>
      </form>

      <p>
        <span className="text-red-600">¿No tienes una cuenta? </span>
        <Link
          to="/login-actions/registration"
          className={isLoading ? 'pointer-events-none opacity-50' : ''}
        >
          Cree una cuenta
        </Link>
      </p>
    </>
  );
};
