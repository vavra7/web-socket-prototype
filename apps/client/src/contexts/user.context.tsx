import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import React from 'react';

export const UserContext = createContext<string | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [signum] = useState(`signum${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`);
  return <UserContext.Provider value={signum}>{children}</UserContext.Provider>;
};
