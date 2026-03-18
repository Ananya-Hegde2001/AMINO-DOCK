import { useEffect, useState } from 'react';
import api from '../utils/api';

const AuthenticityCheckPage = () => {
  const [qrCode, setQrCode] = useState('');
  const [nfcTag, setNfcTag] = useState('');
  const [scanValue, setScanValue] = useState('');
  const [demoCodes, setDemoCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadDemoCodes = async () => {
      try {
        const { data } = await api.get('/verify/demo-codes');
        setDemoCodes(data?.demo || []);
      } catch (error) {
        setDemoCodes([]);
      }
    };

    loadDemoCodes();
  }, []);

  const checkQR = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/verify/qr', { qrCode });
      setResult(data);
    } catch (error) {
      setResult(error?.response?.data || { verified: false, message: 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  const checkNFC = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/verify/nfc', { nfcTag });
      setResult(data);
    } catch (error) {
      setResult(error?.response?.data || { verified: false, message: 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  const checkAnyValue = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get('/verify/lookup', {
        params: {
          value: scanValue
        }
      });
      setResult(data);
    } catch (error) {
      setResult(error?.response?.data || { verified: false, message: 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-arena page-section">
      <div className="content-shell max-w-5xl space-y-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-white/80 p-6 shadow-xl shadow-red-500/5 backdrop-blur sm:p-8 dark:bg-zinc-900/80">
          <div className="pointer-events-none absolute -left-14 top-0 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-700 dark:text-red-300">Smart Verification Center</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.93] sm:text-6xl">
            PRODUCT
            <span className="block text-red-600">AUTHENTICITY CHECK</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
            Confirm your product against the AMINO DOCK registry using QR code, NFC tag, product code, or any scanned value.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Real-time Verification</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">QR and NFC Ready</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Registry Matched</span>
          </div>
        </header>

        <form onSubmit={checkAnyValue} className="auth-card rounded-[1.5rem] border border-red-500/25 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Universal Scan Input</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Paste scanned text, product code, QR value, NFC tag, or URL with code.</p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <input
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              required
              placeholder="Example: AD-QR-ELITE-WHEY-1001 or https://domain.com/verify?code=AD-QR-ELITE-WHEY-1001"
              className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
            />
            <button
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Scan'}
            </button>
          </div>
        </form>

        {!!demoCodes.length && (
          <div className="auth-card rounded-[1.5rem] border border-red-500/25 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Demo Verification Codes</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Use these to test the authenticity workflow instantly.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {demoCodes.map((item) => (
                <article key={item.productCode} className="rounded-xl border border-red-500/20 bg-white/70 p-3 dark:bg-black/20">
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-xs text-[var(--text-muted)]">Product Code: {item.productCode}</p>
                  <p className="text-xs text-[var(--text-muted)]">QR: {item.qrCode}</p>
                  <p className="text-xs text-[var(--text-muted)]">NFC: {item.nfcTag}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={() => setQrCode(item.qrCode)}
                    >
                      Use QR
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={() => setNfcTag(item.nfcTag)}
                    >
                      Use NFC
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={() => setScanValue(item.productCode)}
                    >
                      Use Product Code
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <form onSubmit={checkQR} className="auth-card rounded-[1.5rem] border border-red-500/25 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">QR Code Scanner</h2>
            <input
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              required
              placeholder="Enter scanned QR code"
              className="mt-3 w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
            />
            <button
              className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify QR'}
            </button>
          </form>

          <form onSubmit={checkNFC} className="auth-card rounded-[1.5rem] border border-red-500/25 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">NFC Tag Scanner</h2>
            <input
              value={nfcTag}
              onChange={(e) => setNfcTag(e.target.value)}
              required
              placeholder="Enter scanned NFC tag"
              className="mt-3 w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
            />
            <button
              className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify NFC'}
            </button>
          </form>
        </div>

        {result && (
          <div className="auth-card rounded-[1.5rem] border border-red-500/25 p-5 sm:p-6">
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                result.verified
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300'
              }`}
            >
              {result.verified ? 'Authentic Product' : 'Verification Failed'}
            </p>

            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {result.productName && <p>Product: {result.productName}</p>}
              {result.productCode && <p>Product Code: {result.productCode}</p>}
              {result.batchNo && <p>Batch: {result.batchNo}</p>}
              {result.manufacturedAt && <p>Manufactured: {new Date(result.manufacturedAt).toLocaleDateString()}</p>}
              {result.expiresAt && <p>Expires: {new Date(result.expiresAt).toLocaleDateString()}</p>}
              {typeof result.scans === 'number' && <p>Total scans: {result.scans}</p>}
            </div>
            {result.message && <p className="mt-2 text-sm text-[var(--text-muted)]">{result.message}</p>}
          </div>
        )}
      </div>
      <div className="auth-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </section>
  );
};

export default AuthenticityCheckPage;
