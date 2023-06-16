const express = require("express");
const router = express.Router();

const Logs = require("../../models/Logs");
/**
 * Les requêtes postales sur /logs/update sont effectuées par la fenêtre d'examen toutes les secondes.
 * s'il n'existe pas d'entrée dans la base de données correspondant à la paire donnée de code d'examen et de courriel de l'étudiant
 * il en crée une nouvelle, sinon il remplace l'ancienne
 */
router.post("/update", (req, res) =>{

    Logs.findOneAndUpdate({exam_code: req.body.exam_code, student_email:req.body.student_email}, req.body, {upsert: true}, function(err, doc) {
        if (err){
            return res.status(400).json("Error Occoured");
        }
        return res.status(200).json("Success");
    });

});

/**
 * Obtenir une requête sur "/logs/logByEmail" avec les paramètres exam_code et student_email.
 * Cette requête est effectuée chaque fois que l'étudiant appuie sur le bouton "commencer l'examen" afin de vérifier si
 * l'étudiant passe cet examen pour la première fois ou s'il est sorti de l'examen et y est revenu
 */
router.get("/logByEmail", (req, res) => {
    const req_exam_code = req.query.exam_code;
    const req_student_email = req.query.student_email;
    
    Logs.findOne({ exam_code : req_exam_code, student_email: req_student_email }).then(log=>{
        
        if(!log){
            return res.status(400).json("Étudiant passant l'examen pour la première fois");
        }
        return res.status(200).json(log);
    });
}); 

/**
 * Requête POST pour obtenir toutes les données des étudiants pour le code d'examen donné
 */
router.post("/allData", (req,res) => {
    Logs.find({ exam_code: req.body.exam_code}, function (err, docs) {
        
        if(err){
            return res.status(400).json("Erreur survenue");
        }
        return res.status(200).json(docs);
    });
});
module.exports = router;