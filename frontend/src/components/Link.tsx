import { Link as WouterLink } from 'wouter';

export interface LinkProps {
  className?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Link = ({ className = '', to, onClick, children }: LinkProps) => {
  const fullClassName =
    'text-blue-600 hover:text-red-500 cursor-pointer select-none ' + className;

  if (to)
    return (
      <WouterLink to={to} className={fullClassName}>
        {children}
      </WouterLink>
    );

  if (onClick)
    return (
      <span onClick={onClick} className={fullClassName}>
        {children}
      </span>
    );
};
