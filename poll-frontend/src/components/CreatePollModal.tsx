import React, { useState } from "react";
import { socketService } from "../services/socket.service";
import { CreatePollData } from "../types";
import "../styles/CreatePollModal.css";

interface CreatePollModalProps {
  onClose: () => void;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({
  onClose,
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [duration, setDuration] = useState(60);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    const validOptions = options.filter((opt) => opt.trim());
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options");
      return;
    }

    const pollData: CreatePollData = {
      question: question.trim(),
      options: validOptions.map((text) => ({ text: text.trim() })),
      duration,
    };

    try {
      socketService.createPoll(pollData);
      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to create poll");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Poll</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here"
              className="question-input"
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label>Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="option-input"
                maxLength={100}
              />
            ))}
          </div>

          <div className="form-group">
            <label>Duration (seconds)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={10}
              max={600}
              className="duration-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
