import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Create navigate function to handle redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send login request to the backend
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // If login successful, update login state and redirect using React Router
      onLogin(username, password);
      setError('');
      
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', true);

      // Redirect to /posts after successful login
      navigate('/posts');
    } else {
      // Show error if login fails
      setError(data.message || 'Invalid username or password');
    }
    setLoading(false); // Stop loading after the request is done
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" align="center">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: '16px' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
