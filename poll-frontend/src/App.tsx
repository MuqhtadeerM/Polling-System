import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { StudentView } from "./components/StudentView";
import { TeacherView } from "./components/TeacherView";
import { socketService } from "./services/socket.service";
import { UserRole } from "./types";
import { getStoredStudentName, setStoredStudentName } from "./utils/helpers";

import "./styles/App.css";

const RoleSelector: React.FC<{
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  onStart: () => void;
}> = ({ role, setRole, studentName, setStudentName, onStart }) => {
  return (
    <div className="role-selector">
      <div className="role-selector-content">
        <h2>Welcome to Interactive Poll</h2>

        <div className="role-buttons">
          <button
            className={`role-btn ${role === "teacher" ? "active" : ""}`}
            onClick={() => setRole("teacher")}
          >
            Teacher
          </button>
          <button
            className={`role-btn ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
        </div>

        {role === "student" && (
          <div className="name-input-group">
            <label>Your Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>
        )}

        <button className="start-btn" onClick={onStart} disabled={!role}>
          {role === "teacher" ? "Start Teaching" : "Join Class"}
        </button>
      </div>
    </div>
  );
};

function App() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();

  // restore student name if exists
  useEffect(() => {
    const storedName = getStoredStudentName();
    if (storedName) {
      setStudentName(storedName);
    }
  }, []);

  // socket lifecycle (connect once role is chosen)
  useEffect(() => {
    if (role) {
      socketService.connect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [role]);

  const handleStart = () => {
    if (role === "student") {
      if (!studentName.trim()) {
        alert("Please enter your name");
        return;
      }

      setStoredStudentName(studentName.trim());
      navigate("/student");
      return;
    }

    if (role === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div className="app">
      <Routes>
        {/* Role selection */}
        <Route
          path="/"
          element={
            <RoleSelector
              role={role}
              setRole={setRole}
              studentName={studentName}
              setStudentName={setStudentName}
              onStart={handleStart}
            />
          }
        />

        {/* Teacher dashboard */}
        <Route path="/teacher" element={<TeacherView />} />

        {/* Student dashboard */}
        <Route
          path="/student"
          element={<StudentView studentName={studentName} />}
        />
      </Routes>
    </div>
  );
}

export default App;
