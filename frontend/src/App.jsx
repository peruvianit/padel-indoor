import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Stato per l'evento beforeinstallprompt

  // Controlla se c'è un login salvato nel localStorage al primo avvio
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }

    // Aggiungi l'evento 'beforeinstallprompt' per la PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      // Previeni la visualizzazione automatica del prompt
      e.preventDefault();
      setDeferredPrompt(e); // Salva l'evento per utilizzarlo successivamente
    });

    return () => {
      // Rimuovi l'evento quando il componente viene smontato
      window.removeEventListener('beforeinstallprompt', () => {});
    };
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

  // Funzione per gestire l'installazione della PWA
  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Mostra il prompt di installazione
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'utente ha accettato l\'installazione');
        }
        setDeferredPrompt(null); // Resetta il prompt
      });
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Dashboard onLogout={handleLogout} />
          {/* Mostra il bottone di installazione solo se il prompt è disponibile */}
          {deferredPrompt && (
            <button onClick={handleInstallClick}>Aggiungi alla schermata home</button>
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
