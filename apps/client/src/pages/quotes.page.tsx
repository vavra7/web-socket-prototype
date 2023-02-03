import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { useQuotes } from '../hooks/useQuotes';

const QuotesPage: FC = () => {
  const { data, loading } = useQuotes();
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <h1>Quotes</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/quotes/${item.id}`}>edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default QuotesPage;
