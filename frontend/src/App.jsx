import { useState, useEffect } from 'react';

import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Controlla se c'è un login salvato nel localStorage al primo avvio
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // In un'app reale, salveresti anche il token JWT qui
    localStorage.setItem('auth_token', 'true'); // esempio finto token
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
