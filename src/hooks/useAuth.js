import { useState } from 'react';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = (username, password) => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsLoggedIn(false);

  return { isLoggedIn, login, logout };
}
