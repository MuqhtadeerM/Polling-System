import React, { useState, useEffect } from "react";
import { Poll } from "../types";
import { socketService } from "../services/socket.service";
import {
  calculatePercentage,
  formatTime,
  getStoredStudentId,
  setStoredStudentId,
} from "../utils/helpers";
import { usePoll } from "../hooks/usePoll";
import "../styles/StudentView.css";

interface StudentViewProps {
  studentName: string;
}

export const StudentView: React.FC<StudentViewProps> = ({ studentName }) => {
  const { poll, timeRemaining, error, setError } = usePoll();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [studentId] = useState(() => {
    let id = getStoredStudentId();
    if (!id) {
      id = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setStoredStudentId(id);
    }
    return id;
  });

  const handleVote = (optionIndex: number) => {
    if (hasVoted || !poll || poll.status !== "ACTIVE") return;

    setSelectedOption(optionIndex);
    setHasVoted(true);

    try {
      socketService.submitVote({
        pollId: poll._id,
        studentId,
        optionIndex,
      });
    } catch (err: any) {
      setError(err.message);
      setHasVoted(false);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (poll && poll.status === "ACTIVE") {
      setHasVoted(false);
      setSelectedOption(null);
    }
  }, [poll?._id]);

  if (!poll) {
    return (
      <div className="student-view">
        <div className="waiting-state">
          <div className="pulse-animation"></div>
          <h2>Wait for the teacher to ask a new question</h2>
        </div>
      </div>
    );
  }

  if (poll.status === "COMPLETED") {
    return (
      <div className="student-view">
        <div className="waiting-state">
          <h2>Poll Ended</h2>
          <p>Wait for the teacher to ask a new question</p>
        </div>
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="student-view">
      <div className="poll-container">
        <div className="poll-header">
          <div className="question-section">
            <h2 className="question-label">Question</h2>
            <div className="question-box">
              <p>{poll.question}</p>
            </div>
          </div>
          {timeRemaining > 0 && (
            <div className="timer">
              <span className="timer-icon">⏱</span>
              <span className="timer-value">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>

        <div className="options-list">
          {poll.options.map((option, index) => {
            const percentage = calculatePercentage(option.votes, totalVotes);
            const isSelected = selectedOption === index;

            return (
              <div
                key={index}
                className={`option-item ${isSelected ? "selected" : ""} ${hasVoted ? "voted" : ""}`}
                onClick={() => !hasVoted && handleVote(index)}
              >
                <div className="option-content">
                  <div className="option-indicator">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="option-text">{option.text}</span>
                </div>
                {hasVoted && (
                  <div className="vote-bar-container">
                    <div
                      className="vote-bar"
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="percentage-label">{percentage}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};
