import type { FC } from 'react';
import type { User } from '../types';

type Props = {
  user: User | null;
};

export const Home: FC<Props> = ({ user }) => {
  return (
    <div className="p-6 backdrop-blur-2xl rounded-2xl">
      <h1>Hello</h1>
      {user && (
        <>
          <p>id: {user.id}</p>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
        </>
      )}
    </div>
  );
};
