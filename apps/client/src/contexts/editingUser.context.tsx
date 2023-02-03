import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import type { EditStatus, StartEdit } from 'shared';
import { EditingUserEventEnum } from 'shared';

import { useSocket } from '../hooks/useSocket';
import { useUser } from '../hooks/useUser';

export interface Data {
  lastVersion: number | null;
  quoteId: string;
  users: string[];
}

export type Actions = {
  startEdit: (quoteId: string) => void;
  stopEdit: () => void;
};

export interface EditingUserState {
  actions: Actions;
  data: Data;
}

export const EditingUserContext = createContext<EditingUserState | undefined>(undefined);

/**
 * Context provider containing all web socket logic
 */
export const EditingUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<Data>({
    users: [],
    quoteId: '',
    lastVersion: null
  });

  const user = useUser();

  const socket = useSocket({
    uri: 'ws://localhost:5000/editing-user',
    options: { reconnectionAttempts: 5, reconnectionDelay: 1000, autoConnect: false }
  });

  const initListeners = (): void => {
    socket.on(EditingUserEventEnum.EditStatus, (data: EditStatus) => setData(data));
  };

  const startEdit: Actions['startEdit'] = quoteId => {
    const payload: StartEdit = { quoteId, signum: user };
    socket.emit(EditingUserEventEnum.StartEdit, payload);
  };

  const stopEdit: Actions['stopEdit'] = () => {
    socket.emit(EditingUserEventEnum.StopEdit);
  };

  useEffect(() => {
    initListeners();
    socket.connect();
  }, [socket]);

  return (
    <EditingUserContext.Provider value={{ actions: { startEdit, stopEdit }, data }}>
      {children}
    </EditingUserContext.Provider>
  );
};
