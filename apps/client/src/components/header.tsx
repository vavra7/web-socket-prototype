import type { FC } from 'react';
import React from 'react';

import { useUser } from '../hooks/useUser';

const Header: FC = () => {
  const user = useUser();

  return (
    <div style={{ background: 'grey', padding: '8px', textAlign: 'right', fontSize: '32px' }}>
      {user}
    </div>
  );
};

export default Header;
