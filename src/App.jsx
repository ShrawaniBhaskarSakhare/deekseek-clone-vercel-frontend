import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="h-screen w-screen bg-gray-900 text-white">
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;






