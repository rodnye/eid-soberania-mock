import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title + ' - Mock';
    return () => {
      document.title = 'Soberanía - Mock';
    };
  }, [title]);
};
