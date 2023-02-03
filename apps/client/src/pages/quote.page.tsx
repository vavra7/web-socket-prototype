import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useEditingUser } from '../hooks/useEditingUser';
import { useQuote } from '../hooks/useQuote';
import { useUser } from '../hooks/useUser';

const QuotePage: FC = () => {
  const user = useUser();
  const { quoteId } = useParams();
  const { data, loading } = useQuote(quoteId!);
  const editingUser = useEditingUser();

  useEffect(() => {
    if (!quoteId) return;
    editingUser.actions.startEdit(quoteId);
    return () => editingUser.actions.stopEdit();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <>
      <h1>Quote {quoteId}</h1>
      <label>
        <b>description</b>
      </label>
      <br />
      <div>{data.description}</div>
      <br />
      <button disabled={data.version !== editingUser.data.lastVersion}>save</button>
      {data.version !== editingUser.data.lastVersion && (
        <small style={{ color: 'red' }}>Version you are editing is not up-to-date.</small>
      )}
      <div style={{ position: 'fixed', bottom: 0 }}>
        {editingUser.data.users
          .filter(item => item !== user)
          .map(item => (
            <div
              key={item}
              style={{ padding: '8px', margin: '4px', borderRadius: '16px', background: 'orange' }}
            >
              {item}
            </div>
          ))}
      </div>
    </>
  );
};

export default QuotePage;
