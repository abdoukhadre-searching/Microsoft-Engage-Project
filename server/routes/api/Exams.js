const express = require("express");
const router = express.Router();

const Exam = require("../../models/Exams");
const validateExamInput = require("../../validation/CreateExam");

/**
 * Une requête post sur /createExam crée un examen.
 * D'abord un validateur personnalisé valide les requêtes
 * Ensuite, nous essayons de vérifier si le même code d'examen est présent. Si ce n'est pas le cas
 * Nous créons l'examen, sinon nous affichons une erreur.
 */
router.post("/createExam", (req, res) =>{

    // vérifier que les données de l'examen ne comportent pas d'erreurs
    const {errors, isValid} = validateExamInput(req.body);

    // en cas d'erreur, renvoyer le code d'erreur 400 avec la description de l'erreur
    if(!isValid){
        return res.status(400).json(errors);
    }

    Exam.findOne({exam_code : req.body.exam_code}).then(exam=>{
        // si le code d'examen est déjà présent, renvoyer l'erreur
        if(exam){
            return res.status(400).json({name: "L'examen avec ce code existe dans la base de données"});
        }
        else{

            const newExam = new Exam({
                name: req.body.name,
                prof_email: req.body.prof_email,
                exam_link: req.body.exam_link,
                date_time_start: req.body.date_time_start,
                duration: req.body.duration,
                exam_code:req.body.exam_code,
            });
            
            newExam.save().then(exam=>res.join(exam)).catch(err=> console.log(err));
            return res.status(200).json(newExam);

        }

    });


});

/**
 * Obtenir des requêtes sur /examByCode avec exam_code comme paramètre de requête
 * Retourne l'objet examen si le code de l'examen est correct, sinon une erreur est soulevée.
 */
router.get("/examByCode", (req, res) => {
    const req_exam_code=req.query.exam_code;
    Exam.findOne({ exam_code : req_exam_code}).then(exam=>{
        
        if(!exam){
            return res.status(400).json("Le code d'examen n'est pas valide");
        }
        return res.status(200).json(exam);
    });
}); 

/**
 * Obtenir des requêtes sur /examByProf avec exam_code et prof_email comme paramètre de requête.
 * renvoie l'objet examen si le code de l'examen est correct et s'il a été créé par le professeur
 * avec prof_email id
 * sinon, il renvoie une erreur
 */
router.get("/examsByProf", (req, res) => {
    const req_exam_code=req.query.exam_code;
    const req_prof_email=req.query.prof_email;
    Exam.findOne({ prof_email: req_prof_email, exam_code: req_exam_code}).then(doc=> {
        if(!doc){
            return res.status(400).json("L'examen n'existe pas ou le professeur n'en a pas l'autorisation");
        }
        return res.status(200).json(doc);
    });
});

// export the router
module.exports = router;