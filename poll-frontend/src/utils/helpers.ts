export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const calculatePercentage = (
  votes: number,
  totalVotes: number,
): number => {
  if (totalVotes === 0) return 0;
  return Math.round((votes / totalVotes) * 100);
};

export const getRemainingTime = (startedAt: Date, duration: number): number => {
  const elapsed = Math.floor(
    (Date.now() - new Date(startedAt).getTime()) / 1000,
  );
  return Math.max(duration - elapsed, 0);
};

export const generateStudentId = (): string => {
  return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getStoredStudentId = (): string | null => {
  return localStorage.getItem("studentId");
};

export const setStoredStudentId = (id: string): void => {
  localStorage.setItem("studentId", id);
};

export const getStoredStudentName = (): string | null => {
  return localStorage.getItem("studentName");
};

export const setStoredStudentName = (name: string): void => {
  localStorage.setItem("studentName", name);
};
