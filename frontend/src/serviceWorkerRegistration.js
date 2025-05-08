// Funzione per registrare il Service Worker
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')  // Assicurati che il service worker sia nel percorso giusto
        .then((registration) => {
          console.log('Service Worker registrato con successo:', registration);
        })
        .catch((error) => {
          console.error('Errore nella registrazione del Service Worker:', error);
        });
    });
  }
}

// Funzione per annullare la registrazione del Service Worker (se necessario)
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
