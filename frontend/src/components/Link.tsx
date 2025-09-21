import { Link as WouterLink } from 'wouter';

export interface LinkProps {
  className?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  keepParams?: boolean;
}

export const Link = ({
  className = '',
  to,
  onClick,
  children,
  keepParams = true,
}: LinkProps) => {
  const fullClassName =
    'text-blue-600 hover:text-red-500 cursor-pointer select-none ' + className;

  if (to) {
    const href = keepParams ? `${to}${window.location.search}` : to;

    return (
      <WouterLink href={href} className={fullClassName}>
        {children}
      </WouterLink>
    );
  }

  if (onClick)
    return (
      <span onClick={onClick} className={fullClassName}>
        {children}
      </span>
    );

  return null;
};
