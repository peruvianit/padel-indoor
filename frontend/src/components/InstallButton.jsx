import React, { useEffect, useState } from 'react';

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Salva il prompt
      setIsInstallable(true); // Mostra bottone
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Mostra il prompt nativo
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Installazione accettata');
    } else {
      console.log('Installazione rifiutata');
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <>
      {isInstallable && (
        <div className="d-flex justify-content-center my-3">
            <button className="btn btn-primary btn-lg" onClick={handleInstallClick}>
            📲 Installa l'app
            </button>
        </div>
      )}
    </>
  );
}

export default InstallButton;
