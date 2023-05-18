export default function isInThePast(date) {
  const datew = new Date(date).getTime();
  const today = new Date().getTime();
  return datew < today;
}
