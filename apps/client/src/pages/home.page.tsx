import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

const HomePage: FC = () => {
  const user = useUser();

  return (
    <>
      <h1>Web Socket Prototype</h1>
      <small>
        logged as <b>{user}</b>
      </small>
      <div>
        <Link to="/quotes">Quotes</Link>
      </div>
    </>
  );
};

export default HomePage;
