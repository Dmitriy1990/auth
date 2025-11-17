import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import type { FC } from 'react';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

type Props = {
  setUser: (_: User | null) => void;
};

export const Login: FC<Props> = ({ setUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post<{ user: User }>('http://localhost:3001/api/auth/login', form);
      setUser(res.data.user);
      navigate('/');
    } catch (e: any) {
      console.error(e?.message as AxiosError);
      setError(e?.message as string);
    }
  };

  return (
    <div>
      <p className="text-red-600">{error}</p>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          className="border p-2 w-full mb-3"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full p-2 bg-blue-500 text-white">Send</button>
      </form>
    </div>
  );
};
