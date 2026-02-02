import React, { useState } from "react";
import "../styles/ParticipantsList.css";

interface Participant {
  name: string;
  studentId: string;
}

export const ParticipantsList: React.FC = () => {
  // Mock data - in real implementation, this would come from socket events
  const [participants] = useState<Participant[]>([
    { name: "Rahul Arora", studentId: "1" },
    { name: "Pushpender Rautela", studentId: "2" },
    { name: "Rijul Zalpuri", studentId: "3" },
    { name: "Nadeem N", studentId: "4" },
    { name: "Ashwin Sharma", studentId: "5" },
  ]);

  const handleKickOut = (studentId: string) => {
    console.log("Kick out:", studentId);
    // In real implementation, emit socket event to kick out user
  };

  return (
    <div className="participants-list">
      <div className="participants-header">
        <h3>Name</h3>
        <h3>Action</h3>
      </div>
      <div className="participants-body">
        {participants.map((participant) => (
          <div key={participant.studentId} className="participant-item">
            <span className="participant-name">{participant.name}</span>
            <button
              className="kick-btn"
              onClick={() => handleKickOut(participant.studentId)}
            >
              Kick out
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
