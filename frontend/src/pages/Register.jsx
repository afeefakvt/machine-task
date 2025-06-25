import { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: '',
    },
    address: {
      city: '',
      street: '',
      number: 3,
      zipcode: '',
      geolocation: {
        lat: '0',
        long: '0',
      },
    },
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(user);
      alert('User Registered!');
    } catch (err) {
      alert('Registration Failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          placeholder="First Name"
          value={user.name.firstname}
          onChange={(e) =>
            setUser({
              ...user,
              name: { ...user.name, firstname: e.target.value },
            })
          }
        />
        <input
          placeholder="Last Name"
          value={user.name.lastname}
          onChange={(e) =>
            setUser({
              ...user,
              name: { ...user.name, lastname: e.target.value },
            })
          }
        />
        <input
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;