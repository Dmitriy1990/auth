import type { FC } from 'react';
import type { User } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  user: User | null;
  setUser: (_: User | null) => void;
};

export const Navbar: FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout');
      navigate('/');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="flex w-full px-4 py-2 bg-blue-600 items-center justify-between">
      <Link to={'/'} className="font-bold text-white text-2xl">
        Logo
      </Link>
      {user ? (
        <button
          onClick={logOut}
          className="p-2 border-0 rounded-[5px] bg-red-700 inline-block font-medium text-white">
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/login"
            className="p-2 rounded-[5px] bg-green-600 inline-block font-medium text-white">
            Login
          </Link>
          <Link
            to="/register"
            className="p-2 rounded-[5px] bg-red-500 inline-block font-medium text-white">
            Register
          </Link>
        </div>
      )}
    </header>
  );
};
