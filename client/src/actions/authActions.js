import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

/**
 * Enregistre l'utilisateur en appelant une API au backend, distribue les erreurs.
 * le cas échéant
 * 
 * @param {Object} userData 
 * @param {useHistory} history 
 * 
 */
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // Renvoi à la connexion en cas HTTP Response OK. 201 réussi
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 * Logs in the user by calling API to the backend, recieves token, decodes
 * il utilise jwt_decode, enregistre le jeton dans le stockage local et les en-têtes d'authentification,
  définit l'utilisateur actuel
 * @param {Object} userData 
 * 
 */
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // Placer le token dans localStorage
      localStorage.setItem("jwtToken", token);
      // Placer le token dans le "Auth header"
      setAuthToken(token);
      // Décoder le token pour obtenir les données de l'utilisateur
      const decoded = jwt_decode(token);
      // Définir l'utilisateur actuel
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Définir l'utilisateur connecté
export const setCurrentUser = decoded => {

  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


// Chargement par l'utilisateur
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

/**
 * Déconnecte l'utilisateur en supprimant le jeton JWT, en l'enlevant de l'en-tête et en
 * en donnant à l'utilisateur actuel la valeur "vide".
 */
export const logoutUser = () => dispatch => {
  // Retirer le token du localStorage
  localStorage.removeItem("jwtToken");
  // Supprimer dans l'en-tête auth pour les demandes futures
  setAuthToken(false);
  // Définir l'utilisateur actuel comme un objet vide {}, ce qui donnera la valeur false à isAuthenticated.
  dispatch(setCurrentUser({}));
};