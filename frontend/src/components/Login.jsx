import { useState } from 'react';
import logo from '../logo.svg'; // Assicurati che il path sia corretto

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      alert('Credenziali sbagliate!');
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
