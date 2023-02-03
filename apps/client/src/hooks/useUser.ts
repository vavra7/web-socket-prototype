import { useContext } from 'react';

import { UserContext } from '../contexts/user.context';

export function useUser(): string {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error('useUser hook must be called withing UserProvider');
  return userContext;
}
