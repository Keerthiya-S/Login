import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Posts from './components/Posts';
import Comments from './components/Comments';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const handleLogin = (username, password) => {
    setIsLoggedIn(true);  // Set login status to true
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comments/:postId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Comments />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
