import { useContext } from 'react';

import type { EditingUserState } from '../contexts/editingUser.context';
import { EditingUserContext } from '../contexts/editingUser.context';

export function useEditingUser(): EditingUserState {
  const editingUserContext = useContext(EditingUserContext);
  if (!editingUserContext)
    throw new Error('useEditingUser hook must be called withing EditingUserProvider');
  return editingUserContext;
}
