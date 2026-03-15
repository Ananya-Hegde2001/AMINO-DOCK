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
    <div className="rounded-3xl border border-red-500/20 bg-white p-6 shadow-sm dark:bg-zinc-900">
      <h2 className="brand-wordmark text-4xl text-black dark:text-white">
        CUSTOM <span className="text-red-600">SUPPLEMENT BUILDER</span>
      </h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold uppercase tracking-wide">
          Step 1: Select Base Product
          <select
            className="mt-2 w-full rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
            value={form.baseProduct}
            onChange={(e) => setForm((s) => ({ ...s, baseProduct: e.target.value }))}
          >
            {BASE_PRODUCTS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold uppercase tracking-wide">
          Step 2: Select Flavour
          <select
            className="mt-2 w-full rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
            value={form.flavour}
            onChange={(e) => setForm((s) => ({ ...s, flavour: e.target.value }))}
          >
            {flavours.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold uppercase tracking-wide">
          Step 3: Select Sweetener
          <select
            className="mt-2 w-full rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
            value={form.sweetener}
            onChange={(e) => setForm((s) => ({ ...s, sweetener: e.target.value }))}
          >
            {sweeteners.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Step 4: Select Extra Ingredients</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {EXTRA_INGREDIENTS.map((item) => {
              const active = form.extras.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleExtra(item)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                    active ? 'bg-red-600 text-white' : 'border border-red-500/25'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-red-50 p-4 dark:bg-zinc-800">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">Step 5: Generate Custom Stack</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{stackLabel}</p>
        <button type="button" onClick={generate} className="mt-3 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white">
          Generate Custom Stack
        </button>
      </div>

      {result && (
        <div className="mt-5 rounded-xl border border-red-500/30 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Generated Stack</p>
          <p className="mt-2 text-sm">Base: {result.baseProduct}</p>
          <p className="text-sm">Flavour: {result.flavour}</p>
          <p className="text-sm">Sweetener: {result.sweetener}</p>
          <p className="text-sm">Extras: {result.extras.join(', ') || 'None'}</p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">Formula Code: {result.formulaCode}</p>
        </div>
      )}
    </div>
  );
};

export default BuilderStepper;
