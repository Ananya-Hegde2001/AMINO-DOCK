import { useMemo, useState } from 'react';
import { BASE_PRODUCTS, EXTRA_INGREDIENTS } from '../utils/constants';

const sweeteners = ['Stevia', 'Sucralose', 'Monk Fruit', 'No Sweetener'];
const flavours = ['Chocolate', 'Plain Coffee', 'Unflavoured', 'Choco Peanut', 'Caffe Peanut', 'Citrus'];

const BuilderStepper = () => {
  const [form, setForm] = useState({
    baseProduct: BASE_PRODUCTS[0],
    flavour: flavours[0],
    sweetener: sweeteners[0],
    extras: []
  });

  const [result, setResult] = useState(null);

  const toggleExtra = (extra) => {
    setForm((current) => {
      const exists = current.extras.includes(extra);
      return {
        ...current,
        extras: exists ? current.extras.filter((item) => item !== extra) : [...current.extras, extra]
      };
    });
  };

  const stackLabel = useMemo(() => {
    return `${form.baseProduct} | ${form.flavour} | ${form.sweetener}`;
  }, [form]);

  const generate = () => {
    setResult({
      ...form,
      formulaCode: `AD-${Date.now().toString().slice(-6)}`
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-white/90 p-5 shadow-xl shadow-red-500/5 sm:p-6 dark:bg-zinc-900/85">
      <div className="pointer-events-none absolute -left-12 top-12 h-36 w-36 rounded-full bg-red-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Manual Builder</p>
      <h2 className="brand-wordmark mt-3 text-3xl leading-[0.95] text-black sm:text-4xl dark:text-white">
        CUSTOM <span className="text-red-600">SUPPLEMENT FORMULA</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)]">
        Pick your base, flavor, and sweetener, then activate optional ingredients. You will instantly see a live stack summary before generating your formula code.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="rounded-2xl border border-red-500/15 bg-white/70 p-4 text-sm font-semibold uppercase tracking-wide dark:bg-black/20">
          Step 1: Base Product
          <select
            className="mt-2 w-full rounded-xl border border-red-500/25 bg-transparent px-3 py-2.5 text-sm"
            value={form.baseProduct}
            onChange={(e) => setForm((s) => ({ ...s, baseProduct: e.target.value }))}
          >
            {BASE_PRODUCTS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="rounded-2xl border border-red-500/15 bg-white/70 p-4 text-sm font-semibold uppercase tracking-wide dark:bg-black/20">
          Step 2: Flavor
          <select
            className="mt-2 w-full rounded-xl border border-red-500/25 bg-transparent px-3 py-2.5 text-sm"
            value={form.flavour}
            onChange={(e) => setForm((s) => ({ ...s, flavour: e.target.value }))}
          >
            {flavours.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="rounded-2xl border border-red-500/15 bg-white/70 p-4 text-sm font-semibold uppercase tracking-wide dark:bg-black/20">
          Step 3: Sweetener
          <select
            className="mt-2 w-full rounded-xl border border-red-500/25 bg-transparent px-3 py-2.5 text-sm"
            value={form.sweetener}
            onChange={(e) => setForm((s) => ({ ...s, sweetener: e.target.value }))}
          >
            {sweeteners.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <div className="rounded-2xl border border-red-500/15 bg-white/70 p-4 dark:bg-black/20">
          <p className="text-sm font-semibold uppercase tracking-wide">Step 4: Extra Ingredients</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Selected: {form.extras.length}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXTRA_INGREDIENTS.map((item) => {
              const active = form.extras.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleExtra(item)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                    active
                      ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-500/30'
                      : 'border-red-500/25 bg-white/60 hover:border-red-600/50 dark:bg-zinc-900/70'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-50 to-white p-4 dark:from-zinc-800 dark:to-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">Step 5: Generate Stack</p>
        <p className="mt-2 rounded-xl border border-red-500/15 bg-white/80 px-3 py-2 text-sm text-[var(--text-muted)] dark:bg-black/20">{stackLabel}</p>
        <button
          type="button"
          onClick={generate}
          className="mt-3 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:-translate-y-0.5 hover:bg-red-700"
        >
          Generate Custom Stack
        </button>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-red-500/30 bg-white/80 p-4 dark:bg-black/20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Generated Stack</p>
          <div className="mt-3 grid gap-1.5 text-sm">
            <p>Base: {result.baseProduct}</p>
            <p>Flavor: {result.flavour}</p>
            <p>Sweetener: {result.sweetener}</p>
            <p>Extras: {result.extras.join(', ') || 'None'}</p>
          </div>
          <p className="mt-3 inline-block rounded-full border border-red-500/25 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--text-muted)]">
            Formula Code: {result.formulaCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default BuilderStepper;
