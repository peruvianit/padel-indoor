
import axios from 'axios';

function Dashboard({ onLogout }) {

    const getProtectedData = async () => {
        const res = await axios.get('http://localhost:8000/protected', {
            withCredentials: true, // 🔴 importante anche qui
        });
        console.log(res.data);
    };

    const getDebugCookie = async () => {
        try {
            const res = await axios.get('http://localhost:8000/debug-cookie', {
              withCredentials: true,
            });
            console.log("✅ Risposta ricevuta:", res.data);
        } catch (err) {
            console.error("❌ Errore durante getDebugCookie:", err.response?.data || err.message);
        }
    };


    return (
      <div>
        <h1>Dashboard</h1>
        <p>Benvenuto! Sei autenticato.</p>
        <button onClick={onLogout} className="btn btn-danger mt-3">
          Logout
        </button>
        <button onClick={getProtectedData} className="btn btn-primary mt-3">
          test api protected
        </button>
        <button onClick={getDebugCookie} className="btn btn-primary mt-3">
          debug cookies
        </button>
      </div>
    );
}
  
export default Dashboard;