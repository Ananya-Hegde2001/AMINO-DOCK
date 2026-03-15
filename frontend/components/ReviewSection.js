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
    <form onSubmit={submitReview} className="mt-4 rounded-xl border border-red-500/25 p-4">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red-600">Add review</p>
      <select
        className="w-full rounded-lg border border-red-500/20 px-3 py-2"
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
        className="mt-2 w-full rounded-lg border border-red-500/20 px-3 py-2"
        rows={3}
        placeholder="How was your experience?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="mt-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white" type="submit">
        Submit Review
      </button>
      {message && <p className="mt-2 text-xs text-[var(--text-muted)]">{message}</p>}
    </form>
  );
};

export default ReviewSection;
