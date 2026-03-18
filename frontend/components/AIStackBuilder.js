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
    <div className="relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-b from-white to-red-50/60 p-5 shadow-xl shadow-red-500/5 sm:p-6 dark:from-zinc-900 dark:to-zinc-950">
      <div className="pointer-events-none absolute -right-16 -top-12 h-44 w-44 rounded-full bg-red-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-14 bottom-8 h-36 w-36 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">AI Assistant</p>
      <h3 className="brand-wordmark mt-3 text-3xl leading-[0.95] sm:text-4xl">
        AI <span className="text-red-600">STACK BUILDER</span>
      </h3>

      <p className="mt-3 text-sm text-[var(--text-muted)]">
        Enter your goal and training profile. The AI suggests a stack and gives quick action tips you can apply today.
      </p>

      <form onSubmit={runAI} className="mt-5 grid gap-4">
        <input
          required
          className="w-full rounded-xl border border-red-500/25 bg-white/80 px-3 py-2.5 text-sm dark:bg-black/20"
          placeholder="Goal (muscle gain / fat loss / endurance)"
          value={form.goal}
          onChange={(e) => setForm((s) => ({ ...s, goal: e.target.value }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            type="number"
            className="w-full rounded-xl border border-red-500/25 bg-white/80 px-3 py-2.5 text-sm dark:bg-black/20"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={(e) => setForm((s) => ({ ...s, weight: e.target.value }))}
          />
          <input
            required
            type="number"
            className="w-full rounded-xl border border-red-500/25 bg-white/80 px-3 py-2.5 text-sm dark:bg-black/20"
            placeholder="Workouts per week"
            value={form.workoutFrequency}
            onChange={(e) => setForm((s) => ({ ...s, workoutFrequency: e.target.value }))}
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:-translate-y-0.5 hover:bg-red-700"
        >
          {loading ? 'Generating...' : 'Get AI Recommendation'}
        </button>
      </form>

      {result && (
        <div className="mt-5 rounded-2xl border border-red-500/25 bg-white/70 p-4 dark:bg-black/20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Recommended Stack</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {result.recommendedStack?.map((item) => (
              <li key={item} className="rounded-lg border border-red-500/15 bg-red-50/60 px-3 py-2 dark:bg-zinc-900/70">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Tips</p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
            {result.tips?.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIStackBuilder;
