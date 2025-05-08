import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallButtonVisible, setInstallButtonVisible] = useState(false);

  // Al primo render: controlla se l'utente è già loggato e registra gli handler PWA
  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      setIsLoggedIn(true);
    }

    const handleBeforeInstallPrompt = (event) => {
      // Impedisce che il prompt appaia da solo
      event.preventDefault();

      // Chrome 125+ può emettere più volte l'evento: teniamo solo il primo
      if (!deferredPrompt) {
        setDeferredPrompt(event);
        setInstallButtonVisible(true);
      }
    };

    const handleAppInstalled = () => {
      console.info('[PWA] App installata con successo');
      setDeferredPrompt(null);
      setInstallButtonVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleLogin = () => {
    localStorage.setItem('auth_token', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.info(`[PWA] Scelta utente: ${outcome}`);

    // Dopo la scelta azzeriamo lo stato: Chrome non ri‑utilizza lo stesso evento
    setDeferredPrompt(null);
    setInstallButtonVisible(false);
  }, [deferredPrompt]);

  // Se l'app è già in modalità standalone o su iOS (navigator.standalone) nascondi il bottone
  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      setInstallButtonVisible(false);
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Dashboard onLogout={handleLogout} />
          {isInstallButtonVisible && (
            <button id="install-button" onClick={handleInstallClick}>
              Aggiungi alla schermata home
            </button>
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
