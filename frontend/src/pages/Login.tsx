import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from '../store';

export const Login = observer(() => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await store.login(form);
    if (result) {
      navigate('/');
    }
  };

  return (
    <div>
      <p className="text-red-600">{store.error}</p>
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
});
