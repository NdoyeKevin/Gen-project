const BASE_URL = 'http://your-api-url'; // URL de base de l'API (remplacez "your-api-url" par votre propre URL)

const AuthService = {
  // Effectue une requête de connexion à l'API
  login: async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, { // Effectue une requête POST vers l'URL de connexion de l'API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Spécifie le type de contenu comme JSON
        },
        body: JSON.stringify({ username, password }), // Convertit les données en JSON et les envoie dans le corps de la requête
      });

      if (!response.ok) {
        throw new Error('Une erreur s\'est produite lors de la connexion.'); // Lance une erreur si la réponse n'est pas valide (non-ok)
      }

      const data = await response.json(); // Analyse la réponse JSON
      return data; // Retourne les données de la réponse
    } catch (error) {
      throw new Error('Une erreur s\'est produite lors de la connexion.'); // Lance une erreur générique en cas d'erreur
    }
  },
};

export default AuthService;
