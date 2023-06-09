import React, { useState } from 'react';
import AuthService from './AuthService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(username, password);

      if (response.success) {
        // Rediriger vers la page suivante après une connexion réussie
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
