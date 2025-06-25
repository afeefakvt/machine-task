import { useContext, useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate ,Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

   const { login } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });      
       login(res.token);
      alert('Login successful');
      navigate('/')

    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username (e.g. mor_2314)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (e.g. 83r5^_)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
