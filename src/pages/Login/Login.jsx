import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useLogin from '../../hooks/userLoginHook';
import { useAuthContext } from '../../context/authContext';
import './Login.css';
import "../../App.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const { loading, login } = useLogin();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/admin');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError('');
    if (username && password) {
      try {
        const result = await login({ username, password });

        if (result.success) {
          navigate("/admin");
        } else {
          setError(result.error);
        }

      } catch (err) {
        console.error('Unexpected login error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const isUsernameInvalid = touched && !username;
  const isPasswordInvalid = touched && !password;
  const isFormValid = username && password && !loading;

  if (authUser) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <FaUserCircle className="login-icon" />
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Username"
            className={`login-input${isUsernameInvalid ? ' login-input-error' : ''}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className={`login-input${isPasswordInvalid ? ' login-input-error' : ''}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            className="login-btn" 
            disabled={!isFormValid}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 