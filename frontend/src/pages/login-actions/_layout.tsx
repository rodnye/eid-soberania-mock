import { useParams } from 'wouter';
import { AuthenticateRoute } from './AuthenticateRoute';
import { RegistrationRoute } from './RegistrationRoute';
import { AlertCircle, FolderGit } from 'lucide-react';
import { ResetCredentialsRoute } from './ResetCredentialsRoute';
import { ErrorRoute } from './ErrorRoute';
import heroImg from '../../assets/original-full-logo.svg';
import cubaImg from '../../assets/original-id-cuba.png';

type Action = 'authenticate' | 'registration' | 'reset-credentials';

export const AuthPageLayout = () => {
  const { action } = useParams<{
    action: Action;
  }>();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="m-3 flex w-full max-w-lg flex-col items-center rounded-xl p-6 md:border md:border-gray-300">
        <img src={heroImg} className="mt-6 w-64" />

        <div className="m-4 flex flex-col items-center rounded-xl border border-orange-200 p-6 text-center shadow-md">
          <AlertCircle className="h-8 w-8 text-orange-600" />
          <div className="mt-2 flex items-center">
            <h1 className="text-xl font-bold text-orange-800">Advertencia</h1>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-orange-700">
            No ingreses datos <span className="font-semibold">sensibles </span>
            aquí. Esta página es una imitación con fines de aprendizaje, no es
            la original.
          </p>
        </div>

        <h1 className="mt-4 text-3xl font-light text-cyan-600">
          {action === 'authenticate' && 'Iniciar Sesión'}
          {action === 'registration' && 'Crear Cuenta'}
          {action === 'reset-credentials' && 'Nueva Contraseña'}
        </h1>

        <div className="flex w-full flex-col items-center text-gray-600">
          {action === 'authenticate' ? (
            <AuthenticateRoute />
          ) : action === 'registration' ? (
            <RegistrationRoute />
          ) : action === 'reset-credentials' ? (
            <ResetCredentialsRoute />
          ) : (
            <ErrorRoute />
          )}
        </div>
      </div>

      <div className="my-12 flex w-full flex-col items-center text-gray-500">
        <img src={cubaImg} className="w-32" />
        <p className="m-2">
          Esta es una imitación del sistema de autenticación de la pagina{' '}
          <a
            className="text-blue-600 underline"
            target="_blank"
            href="https://eid.soberania.gob.cu/realms/CUBA/protocol/openid-connect/auth?client_id=joomla&scope=openid&redirect_uri=https://www.soberania.gob.cu/&response_type=code"
          >
            Soberanía
          </a>
        </p>
        <a
          href="https://github.com/rodnye/eid-soberania-mock"
          target="_blank"
          className="flex items-center space-x-2 text-blue-500 underline"
        >
          <FolderGit />
          <span> Repositorio de Github </span>
        </a>
      </div>
    </div>
  );
};
