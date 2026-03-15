import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="page-section">
      <div className="content-shell max-w-md rounded-3xl border border-red-500/20 bg-white p-8 dark:bg-zinc-900">
        <h1 className="brand-wordmark text-5xl">LOGIN</h1>
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-red-500/20 px-3 py-2"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-red-500/20 px-3 py-2"
          />
          <button className="w-full rounded-full bg-red-600 px-4 py-2 font-semibold text-white" type="submit">
            Sign In
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          New here? <a className="text-red-600" href="/register">Create account</a>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
