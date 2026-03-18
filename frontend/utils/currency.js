const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const formatINR = (value) => {
  const amount = Number(value) || 0;
  return INR_FORMATTER.format(amount);
};
