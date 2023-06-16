import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";

  const isEmpty = require("is-empty");

  // definir l'état initiale pour le "auth"
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };

  /**
   * Fonction combinée pour le réglage de l'utilisateur actuel et le réglage du chargement de l'utilisateur
   * @param {State} state 
   * @param {string} action 
   * @returns new state
   */
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }