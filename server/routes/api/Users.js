const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Charger l'input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Charger le User model

const User = require("../../models/Users");


    /**
     * Cette API est utilisée pour enregistrer de nouveaux utilisateurs.
     * Si les données du formulaire ne sont pas valides ou si l'email existe déjà dans la base de données, une erreur est renvoyée.
     * Sinon, le compte est créé.
    */
router.post("/register", (req, res) => {
    // valider les données pour vérifier qu'elles ne comportent pas d'erreurs
    const {errors, isValid} = validateRegisterInput(req.body);

    // valider les données d'enregistrement pour vérifier qu'elles ne comportent pas d'erreurs
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email : req.body.email}).then(user=>{
        // si l'utilisateur est déjà dans la base de données, retourner l'erreur
        // sinon, s'il s'agit d'un nouvel utilisateur, créer un compte
        if(user){
            return res.status(400).json({email: "Email déjà prise "});
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
              return res.status(200).json({email:newUser.email, name:newUser.name, userType:newUser.userType})

        }

    });

});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email introuvable" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            userType:user.userType,
            email:user.email,
          };
        // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 année en secondes
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Mot de passe incorrect" });
        }
      });
    });
  });
  // export the router
  module.exports = router;