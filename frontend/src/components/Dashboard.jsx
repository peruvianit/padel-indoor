
function Dashboard({ onLogout }) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Benvenuto! Sei autenticato.</p>
        <button onClick={onLogout} className="btn btn-danger mt-3">
          Logout
        </button>
      </div>
    );
}
  
export default Dashboard;