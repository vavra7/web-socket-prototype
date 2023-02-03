import type { FC } from 'react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import Header from './components/header';
import { EditingUserProvider } from './contexts/editingUser.context';
import { UserProvider } from './contexts/user.context';
import { router } from './lib/router';

const App: FC = () => {
  return (
    <>
      <UserProvider>
        <EditingUserProvider>
          <Header />
          <div style={{ padding: '0 16px' }}>
            <RouterProvider router={router} />
          </div>
        </EditingUserProvider>
      </UserProvider>
    </>
  );
};

export default App;
