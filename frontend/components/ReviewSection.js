import { useState } from 'react';
import api from '../utils/api';

const ReviewSection = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/reviews', { product: productId, rating: Number(rating), comment });
      setComment('');
      setRating(5);
      setMessage('Review submitted.');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Please login to post a review.');
    }
  };

  return (
    <form onSubmit={submitReview} className="mt-3 rounded-xl border border-red-500/25 bg-white/75 p-4 dark:bg-zinc-900/65">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Add review</p>
      <select
        className="w-full rounded-lg border border-red-500/20 bg-white/70 px-3 py-2 text-sm dark:bg-black/20"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[5, 4, 3, 2, 1].map((item) => (
          <option key={item} value={item}>
            {item} Stars
          </option>
        ))}
      </select>
      <textarea
        className="mt-2 w-full rounded-lg border border-red-500/20 bg-white/70 px-3 py-2 text-sm dark:bg-black/20"
        rows={3}
        placeholder="How was your experience?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="mt-2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white" type="submit">
        Submit Review
      </button>
      {message && <p className="mt-2 text-xs text-[var(--text-muted)]">{message}</p>}
    </form>
  );
};

export default ReviewSection;
