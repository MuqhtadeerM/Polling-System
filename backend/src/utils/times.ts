export const getRemainingTime = (startedAt: Date, duration: number): number => {
  const elapsed = Math.floor(
    (Date.now() - new Date(startedAt).getTime()) / 1000,
  );

  return Math.max(duration - elapsed, 0);
};
