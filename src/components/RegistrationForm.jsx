import React, { useState } from 'react';
import AuthService from './AuthService';

const RegistrationForm = () => {
  const [username, setUsername] = useState(''); // État pour le nom d'utilisateur
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [error, setError] = useState(''); // État pour les erreurs

  // Gère le changement de valeur de l'input nom d'utilisateur
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Gère le changement de valeur de l'input mot de passe
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(username, password); // Appelle la méthode d'inscription de AuthService

      if (response.success) {
        // Redirige vers la page suivante après une inscription réussie
      } else {
        setError(response.message); // Affiche le message d'erreur en cas d'échec de l'inscription
      }
    } catch (error) {
      setError('Une erreur s\'est produite. Veuillez réessayer.'); // Affiche un message générique en cas d'erreur
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <div className="error">{error}</div>} {/* Affiche l'erreur s'il y en a une */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input type="text" value={username} onChange={handleUsernameChange} /> {/* Input pour le nom d'utilisateur */}
        </div>
        <div>
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={handlePasswordChange} /> {/* Input pour le mot de passe */}
        </div>
        <button type="submit">S'inscrire</button> {/* Bouton pour soumettre le formulaire */}
      </form>
    </div>
  );
};

export default RegistrationForm;
