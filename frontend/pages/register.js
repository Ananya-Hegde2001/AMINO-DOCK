import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      router.push('/');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <section className="page-section">
      <div className="content-shell max-w-md rounded-3xl border border-red-500/20 bg-white p-8 dark:bg-zinc-900">
        <h1 className="brand-wordmark text-5xl">REGISTER</h1>
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Name"
            required
            className="w-full rounded-lg border border-red-500/20 px-3 py-2"
          />
          <input
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-red-500/20 px-3 py-2"
          />
          <input
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-red-500/20 px-3 py-2"
          />
          <button className="w-full rounded-full bg-red-600 px-4 py-2 font-semibold text-white" type="submit">
            Create Account
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
      </div>
    </section>
  );
};

export default RegisterPage;
