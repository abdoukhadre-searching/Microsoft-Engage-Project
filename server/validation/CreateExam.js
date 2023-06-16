const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExamInput(ExamData) {
	
  let errors = {};
// Convertir les champs vides en une chaîne vide afin de pouvoir utiliser les fonctions du validateur
  ExamData.name = !isEmpty(ExamData.name) ? ExamData.name : "";
  ExamData.prof_email = !isEmpty(ExamData.prof_email) ? ExamData.prof_email : "";
  ExamData.exam_link = !isEmpty(ExamData.exam_link) ? ExamData.exam_link : "";
  let date = ExamData.date_time_start.toString();
// Email checks
  if (Validator.isEmpty(ExamData.prof_email)) {
	errors.email = "Le champ Email est obligatoire";
  } else if (!Validator.isEmail(ExamData.prof_email)) {
	errors.email = "Email invalide";
  }
// Name checks
  if (Validator.isEmpty(ExamData.name)) {
	errors.name = "Le nom ne peut être vide";
  }
  // exam link checks
  if (Validator.isEmpty(ExamData.exam_link)) {
      errors.exam_link = "Le lien d'examen ne peut pas être vide";
  }
  else if (!Validator.isURL(ExamData.exam_link)) {
    errors.exam_link = "Le lien de l'examen doit être un lien valide en format";
  }
  // date checks
  // if(Validator.isEmpty(date)){
  //     errors.date_time = "Date cannot be empty";
  // }
 

  
	return {
		errors,
		isValid: isEmpty(errors)
	};
};