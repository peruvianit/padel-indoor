import { useState } from 'react';
import logo from '../logo.svg'; // Assicurati che il path sia corretto
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('pippo.rossi_21');
  const [password, setPassword] = useState('@aP9Lm$z2#rW');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log(`${process.env.REACT_APP_CONTEXT}/token`);  
      await axios.post(`${process.env.REACT_APP_CONTEXT}/token`, {
        username,
        password,
      }, {
        withCredentials: true, // 🔴 fondamentale per cookie HttpOnly
        headers: {
          'Content-Type': 'application/json', // ✅ manda JSON
        },
      });
  
      // Login avvenuto con successo
      onLogin();
    } catch (err) {
      alert('Credenziali sbagliate o errore nel login!');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{
          width: '350px',
          borderRadius: '12px',
          position: 'relative',
        }}
      >
        {/* Cerchio con il logo */}
        <div
          className="position-absolute top-0 start-50 translate-middle rounded-circle d-flex justify-content-center align-items-center bg-info"
          style={{
            width: '80px',
            height: '80px',
            marginTop: '-40px',
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </div>

        <div className="mt-5 pt-3 text-center">
          <h4 className="mb-4">Member Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-info text-white w-100 fw-semibold">
              Sign in
            </button>
          </form>
          <div className="mt-3">
            <a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
