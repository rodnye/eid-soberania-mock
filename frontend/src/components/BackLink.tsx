import { ChevronLeft } from 'lucide-react';
import { Link, type LinkProps } from './Link';

export const BackLink = ({
  children = 'Regresar',
  className = '',
  to,
}: Omit<LinkProps, 'children'> & { children?: string }) => {
  return (
    <Link
      to={to}
      onClick={!to ? () => window.history.back() : undefined}
      className={'flex items-center self-start ' + className}
    >
      <ChevronLeft className="h-8 w-8 text-blue-950" />
      <span>{children}</span>
    </Link>
  );
};
