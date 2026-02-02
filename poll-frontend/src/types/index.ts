export interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  duration: number;
  startedAt: Date;
  status: "ACTIVE" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
}

export interface PollOption {
  text: string;
  votes: number;
  _id?: string;
}

export interface CreatePollData {
  question: string;
  options: { text: string }[];
  duration: number;
}

export interface VoteData {
  pollId: string;
  studentId: string;
  optionIndex: number;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

export interface Participant {
  studentId: string;
  name: string;
  joinedAt: Date;
}

export type UserRole = "teacher" | "student";
