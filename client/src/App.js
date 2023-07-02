import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import TestPage from "./components/exam_page/TestPage";
import GlobalStyle from './globalStyles';


// Vérification de la présence du token en permettant à l'utilisateur de rester connecté
if (localStorage.jwtToken) {
  // Définir le token d'authentification au niveau du Header
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Décoder le token et obtenir les informations sur l'utilisateur
  const decoded = jwt_decode(token);
  // Définir le user -- isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Vérifier si le token a expiré
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Déconnexion de l'utilisateur
    store.dispatch(logoutUser());
    // Redirection vers le login
    window.location.href = "./login";
  }
}

/**
 * Composant principal du site web qui a une barre de navigation en haut de toutes les pages
 * et un routeur qui affiche le bon composant en fonction de l'URL
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <GlobalStyle />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/test" component={TestPage} />
            </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;