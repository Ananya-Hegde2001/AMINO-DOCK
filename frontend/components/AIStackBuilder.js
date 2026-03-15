import { useState } from 'react';
import api from '../utils/api';

const AIStackBuilder = () => {
  const [form, setForm] = useState({ goal: 'muscle gain', weight: '', workoutFrequency: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAI = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/ai/recommend-stack', {
        ...form,
        weight: Number(form.weight),
        workoutFrequency: Number(form.workoutFrequency)
      });
      setResult(data);
    } catch (error) {
      setResult({
        recommendedStack: ['Elite Whey Isolate', 'Creatine Monohydrate'],
        tips: ['API unavailable, showing fallback recommendation.']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-red-500/20 bg-gradient-to-b from-white to-red-50 p-6 dark:from-zinc-900 dark:to-zinc-950">
      <h3 className="brand-wordmark text-4xl">
        AI <span className="text-red-600">STACK BUILDER</span>
      </h3>
      <form onSubmit={runAI} className="mt-5 grid gap-4 md:grid-cols-3">
        <input
          required
          className="rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
          placeholder="Goal (muscle gain / fat loss / endurance)"
          value={form.goal}
          onChange={(e) => setForm((s) => ({ ...s, goal: e.target.value }))}
        />
        <input
          required
          type="number"
          className="rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={(e) => setForm((s) => ({ ...s, weight: e.target.value }))}
        />
        <input
          required
          type="number"
          className="rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
          placeholder="Workout frequency / week"
          value={form.workoutFrequency}
          onChange={(e) => setForm((s) => ({ ...s, workoutFrequency: e.target.value }))}
        />
        <button
          type="submit"
          className="md:col-span-3 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
        >
          {loading ? 'Generating...' : 'Get AI Recommendation'}
        </button>
      </form>

      {result && (
        <div className="mt-5 rounded-xl border border-red-500/25 bg-white/70 p-4 dark:bg-black/20">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Recommended Stack</p>
          <ul className="mt-2 space-y-1 text-sm">
            {result.recommendedStack?.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-red-600">Tips</p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
            {result.tips?.map((tip) => (
              <li key={tip}>- {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIStackBuilder;
