const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(LoginData) {
	
  let errors = {};
// Convertir les champs vides en une chaîne vide afin de pouvoir utiliser les fonctions du validateur
  LoginData.email = !isEmpty(LoginData.email) ? LoginData.email : "";
  LoginData.password = !isEmpty(LoginData.password) ? LoginData.password : "";
// Email checks
  if (Validator.isEmpty(LoginData.email)) {
	errors.email = "Email field is required";
  } else if (!Validator.isEmail(LoginData.email)) {
	errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(LoginData.password)) {
	errors.password = "Password field is required";
  }
  
	return {
		errors,
		isValid: isEmpty(errors)
	};
};