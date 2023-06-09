import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // État pour suivre l'état de connexion de l'utilisateur

  // Vérifie si l'utilisateur est déjà connecté lors du chargement de l'application
  useState(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await AuthService.checkLoggedIn(); // Appelle la méthode checkLoggedIn de AuthService

        if (response.success) {
          setLoggedIn(true); // Définit l'état loggedIn à true si l'utilisateur est connecté
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedIn();
  }, []);

  // Gère la déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await AuthService.logout(); // Appelle la méthode logout de AuthService
      setLoggedIn(false); // Définit l'état loggedIn à false
    } catch (error) {
      console.error(error);
    }
  };

  // Gère la connexion de l'utilisateur
  const handleLogin = async (username, password) => {
    try {
      const response = await AuthService.login(username, password); // Appelle la méthode login de AuthService

      if (response.success) {
        setLoggedIn(true); // Définit l'état loggedIn à true si la connexion est réussie
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Mon Application</h1>
        <Switch>
          <Route exact path="/">
            {loggedIn ? ( // Vérifie si l'utilisateur est connecté
              <Redirect to="/dashboard" /> // Redirige vers la page de tableau de bord si connecté
            ) : (
              <LoginForm onLogin={handleLogin} /> // Affiche le formulaire de connexion si déconnecté
            )}
          </Route>
          <Route path="/dashboard">
            {loggedIn ? ( // Vérifie si l'utilisateur est connecté
              <div>
                <h2>Tableau de bord</h2>
                <button onClick={handleLogout}>Se déconnecter</button> // Bouton de déconnexion
              </div>
            ) : (
              <Redirect to="/" /> // Redirige vers la page de connexion si déconnecté
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
