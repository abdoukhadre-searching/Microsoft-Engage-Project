const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// créer un nouveau schéma pour l'utilisateur du site web (professeur ou étudiant)
// userType est vrai si professeur sinon faux
const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType:{
      type: Boolean,
      required:false
    }
    
  });
// export the model
module.exports = User = mongoose.model("users", UserSchema);