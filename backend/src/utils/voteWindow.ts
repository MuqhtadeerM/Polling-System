export const isWithinVotingHours = (): boolean => {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 9 && hour < 18;
};

// this will help to fix the timeer between 9 to 6 and we can only vote at this time
