import axios from "axios";
import { Poll, CreatePollData } from "../types";

const API_URL = "http://localhost:5000/api/poll";

export const pollApi = {
  // Get active poll
  getActivePoll: async (): Promise<Poll | null> => {
    try {
      const response = await axios.get(`${API_URL}/active`);
      return response.data.poll;
    } catch (error) {
      console.error("Error fetching active poll:", error);
      return null;
    }
  },

  // Create poll (REST endpoint as backup)
  createPoll: async (data: CreatePollData): Promise<Poll> => {
    const response = await axios.post(`${API_URL}`, {
      ...data,
      startedAt: new Date(),
    });
    return response.data;
  },

  // End poll (REST endpoint as backup)
  endPoll: async (pollId: string): Promise<Poll> => {
    const response = await axios.post(`${API_URL}/${pollId}/end`);
    return response.data.poll;
  },

  // Get poll history
  getPollHistory: async (): Promise<Poll[]> => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      return response.data.polls;
    } catch (error) {
      console.error("Error fetching poll history:", error);
      return [];
    }
  },
};
