const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(RegistrationData) {
    let errors = {};
  // Convertir les champs vides en une chaîne vide afin de pouvoir utiliser les fonctions du validateur
    RegistrationData.name = !isEmpty(RegistrationData.name) ? RegistrationData.name : "";
    RegistrationData.email = !isEmpty(RegistrationData.email) ? RegistrationData.email : "";
    RegistrationData.password = !isEmpty(RegistrationData.password) ? RegistrationData.password : "";
    RegistrationData.password2 = !isEmpty(RegistrationData.password2) ? RegistrationData.password2 : "";

  // Validation noms
    if (Validator.isEmpty(RegistrationData.name)) {
      errors.name = "Le champ Nom est obligatoire";
    }

  // Validation Email
    if (Validator.isEmpty(RegistrationData.email)) {
      errors.email = "Le champ Email est obligatoire";
    } 
    else if (!Validator.isEmail(RegistrationData.email)) {
      errors.email = "Email n'est pas valide";
    }

  // Password checks
    if (Validator.isEmpty(RegistrationData.password)) {
      errors.password = "Le champ du mot de passe est obligatoire";
    }
    if (Validator.isEmpty(RegistrationData.password2)) {
        errors.password2 = "Le champ Confirmer le mot de passe est obligatoire";
    }
    if (!Validator.isLength(RegistrationData.password, { min: 6, max: 30 })) {
        errors.password = "Le mot de passe doit comporter au moins 6 caractères";
    }
    if (!Validator.equals(RegistrationData.password, RegistrationData.password2)) {
        errors.password2 = "Les mots de passe doivent correspondre";
    }
    // renvoie la liste des erreurs et isValid qui est vrai si la liste est vide
    return {
        errors,
        isValid: isEmpty(errors)
    };
  };