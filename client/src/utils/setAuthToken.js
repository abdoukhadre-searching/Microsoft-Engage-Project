import axios from "axios";

const setAuthToken = token => {

  if (token) {
    // Appliquer un token d'autorisation à chaque demande si l'utilisateur est connecté
    axios.defaults.headers.common["Authorization"] = token;
  } 
  else {
    // Supprimer l'en-tête "auth"
    delete axios.defaults.headers.common["Authorization"];
  }
  
};
export default setAuthToken;