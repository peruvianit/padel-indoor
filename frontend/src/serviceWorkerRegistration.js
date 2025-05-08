export function register() {
  console.log('Funzione register chiamata');  // Questo dovrebbe apparire nella console
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log("Pagina caricata, registrazione del service worker...");
      navigator.serviceWorker
        .register('/service-worker.js')  // Assicurati che il percorso del service worker sia corretto
        .then((registration) => {
          console.log('Service Worker registrato con successo:', registration);
        })
        .catch((error) => {
          console.error('Errore nella registrazione del Service Worker:', error);
        });
    });
  }
}
