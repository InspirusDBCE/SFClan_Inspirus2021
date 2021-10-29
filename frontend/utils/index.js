export function formatTime(mTime) {
  const { hours, minutes } = mTime.toObject();
  return `${hours}:${minutes}`;
}
