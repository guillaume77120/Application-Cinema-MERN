import React, { useState } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import MovieList from './Components/MovieList';

function App() {
  const [token, setToken] = useState('');

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="App">
      <h1>MERN Movie List</h1>
      <Register onRegister={handleRegister} />
      <Login onLogin={handleLogin} />
      {token && <MovieList token={token} />}
    </div>
  );
}

export default App;
