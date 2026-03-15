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
    <section className="page-section">
      <div className="content-shell max-w-4xl">
        <h1 className="brand-wordmark text-5xl md:text-7xl">
          PRODUCT <span className="text-red-600">AUTHENTICITY CHECK</span>
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">Verify your product with QR code or NFC tag against AMINO DOCK registry.</p>

        <form onSubmit={checkAnyValue} className="mt-8 rounded-2xl border border-red-500/25 p-5">
          <h2 className="text-xl font-semibold">Universal Scan Input</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Paste scanned text, product code, QR code, NFC tag, or full URL containing code.
          </p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <input
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              required
              placeholder="Example: AD-QR-ELITE-WHEY-1001 or https://domain.com/verify?code=AD-QR-ELITE-WHEY-1001"
              className="w-full rounded-lg border border-red-500/20 bg-transparent px-3 py-2"
            />
            <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white" type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Scan'}
            </button>
          </div>
        </form>

        {!!demoCodes.length && (
          <div className="mt-5 rounded-2xl border border-red-500/25 p-5">
            <h2 className="text-xl font-semibold">Demo Verification Codes</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Use these to test the authenticity workflow instantly.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {demoCodes.map((item) => (
                <article key={item.productCode} className="rounded-xl border border-red-500/20 p-3">
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-xs text-[var(--text-muted)]">Product Code: {item.productCode}</p>
                  <p className="text-xs text-[var(--text-muted)]">QR: {item.qrCode}</p>
                  <p className="text-xs text-[var(--text-muted)]">NFC: {item.nfcTag}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-600"
                      onClick={() => setQrCode(item.qrCode)}
                    >
                      Use QR
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-600"
                      onClick={() => setNfcTag(item.nfcTag)}
                    >
                      Use NFC
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-600"
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

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <form onSubmit={checkQR} className="rounded-2xl border border-red-500/25 p-5">
            <h2 className="text-xl font-semibold">QR Code Scanner</h2>
            <input
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              required
              placeholder="Enter scanned QR code"
              className="mt-3 w-full rounded-lg border border-red-500/20 bg-transparent px-3 py-2"
            />
            <button className="mt-4 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white" type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify QR'}
            </button>
          </form>

          <form onSubmit={checkNFC} className="rounded-2xl border border-red-500/25 p-5">
            <h2 className="text-xl font-semibold">NFC Tag Scanner</h2>
            <input
              value={nfcTag}
              onChange={(e) => setNfcTag(e.target.value)}
              required
              placeholder="Enter scanned NFC tag"
              className="mt-3 w-full rounded-lg border border-red-500/20 bg-transparent px-3 py-2"
            />
            <button className="mt-4 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white" type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify NFC'}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl border border-red-500/25 p-5">
            <p className={`text-lg font-semibold ${result.verified ? 'text-[var(--text-primary)]' : 'text-red-600'}`}>
              {result.verified ? 'Authentic Product' : 'Verification Failed'}
            </p>
            {result.productName && <p className="mt-2">Product: {result.productName}</p>}
            {result.productCode && <p>Product Code: {result.productCode}</p>}
            {result.batchNo && <p>Batch: {result.batchNo}</p>}
            {result.manufacturedAt && <p>Manufactured: {new Date(result.manufacturedAt).toLocaleDateString()}</p>}
            {result.expiresAt && <p>Expires: {new Date(result.expiresAt).toLocaleDateString()}</p>}
            {typeof result.scans === 'number' && <p>Total scans: {result.scans}</p>}
            {result.message && <p className="mt-2 text-sm text-[var(--text-muted)]">{result.message}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthenticityCheckPage;
