import React, { useState } from "react";
import { usePoll } from "../hooks/usePoll";
import { calculatePercentage, formatTime } from "../utils/helpers";
import { CreatePollModal } from "./CreatePollModal";
import { ParticipantsList } from "./ParticipantsList";
import { ChatPanel } from "./ChatPanel";
import "../styles/TeacherView.css";

export const TeacherView: React.FC = () => {
  const { poll, timeRemaining, error } = usePoll();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "participants">("chat");

  const totalVotes =
    poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;

  return (
    <div className="teacher-view">
      <div className="main-content">
        {poll ? (
          <div className="poll-display">
            <div className="poll-header">
              <div className="question-section">
                <h2 className="question-label">
                  Question {poll.status === "ACTIVE" ? "1" : ""}
                </h2>

                {poll.status === "ACTIVE" && timeRemaining > 0 && (
                  <div className="timer">
                    <span className="timer-icon">⏱</span>
                    <span className="timer-value">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                )}
              </div>

              <div className="question-box">
                <p>{poll.question}</p>
              </div>
            </div>

            <div className="results-section">
              {poll.options.map((option, index) => {
                const percentage = calculatePercentage(
                  option.votes,
                  totalVotes,
                );

                return (
                  <div key={index} className="result-item">
                    <div className="result-header">
                      <div className="option-info">
                        <span className="option-indicator">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="option-text">{option.text}</span>
                      </div>
                      <span className="percentage">{percentage}%</span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="create-poll-btn"
              onClick={() => setShowCreateModal(true)}
            >
              + Ask a new question
            </button>

            {error && <div className="error-message">{error}</div>}
          </div>
        ) : (
          <div className="no-poll-state">
            <h2>No Active Poll</h2>
            <button
              className="create-poll-btn primary"
              onClick={() => setShowCreateModal(true)}
            >
              + Ask a new question
            </button>
          </div>
        )}
      </div>

      <div className="sidebar">
        <div className="sidebar-tabs">
          <button
            className={`tab ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`tab ${activeTab === "participants" ? "active" : ""}`}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>
        </div>

        <div className="sidebar-content">
          {activeTab === "chat" ? <ChatPanel /> : <ParticipantsList />}
        </div>
      </div>

      {showCreateModal && (
        <CreatePollModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
