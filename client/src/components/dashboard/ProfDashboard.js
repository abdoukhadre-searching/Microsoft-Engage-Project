import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { logoutUser } from "../../actions/authActions";
import LogsTable from "./LogsTable.js"
import { connect } from "react-redux";
import DatePicker from 'react-date-picker';


function ProfDashboard(props) {
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [exam_link, setExamLink] = useState("");
  const [date_time_start, setDateTimeStart] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [exam_code, setExamCode] = useState("");
  const [errorText, setErrorText] = useState("");
  const [exam_code_search, setExamCodeSearch] = useState("");
  const axios = require("axios");

  /**
  * Cette fonction ouvre la boîte de dialogue de l'examen
  * Déclenchée lorsque l'utilisateur appuie sur le bouton Créer un examen
  */
  function openExamDialog(){
      setExamDialogOpen(true);
  }

  /**
  * Cette fonction est appelée lorsque l'utilisateur appuie sur le bouton Annuler
  * ou clique en dehors de la boîte de dialogue
  * Elle définit d'abord toutes les variables à leur valeur initiale, puis elle ferme la boîte de dialogue.
  * Elle ferme la boîte de dialogue
  */
  function closeExamDialog(){
      setName("");
      setExamLink("");
      setDateTimeStart(new Date());
      setDuration(0);
      setExamCode("");
      setErrorText("");
      setExamDialogOpen(false);
  }

  /**
   * Utilise des expressions régulières pour vérifier si la chaîne est une URL ou non
   * @param {string} s 
   * @returns true if url, false otherwise
   */
  function isUrl(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      return regexp.test(s);
  }
  
   /**
   * Cette fonction est appelée lorsque l'on appuie sur le bouton Créer un examen.
   * Elle vérifie d'abord si tous les champs sont corrects, si ce n'est pas le cas, elle affiche une erreur.
   * Elle envoie ensuite les données au serveur, ferme la boîte de dialogue et affiche une notification
   * que l'examen a été créé
   */
  function createExam(){
      if(name===""){
          setErrorText("Le nom de l'examen ne peut être vide");
          return;
      }
      if(exam_link===""){
          setErrorText("Le lien d'examen ne peut pas être vide");
          return;
      }
      if(!isUrl(exam_link)){
          setErrorText("Le lien de l'examen doit être une URL valide");
          return;
      }
      if(duration === 0){
          setErrorText("Durée doit pas etre vide");
          return;
      }
      if(exam_code===""){
          setErrorText("Cliquez sur Générer un code d'examen pour obtenir d'abord un code d'examen.");
          return;
      }
      var current_date_time = new Date();
      if(date_time_start< current_date_time){
        setErrorText("Please select a date and time of the future");
        return;
      }
      axios.post('/api/exams/createExam', {
          name: name,
          exam_link: exam_link,
          date_time_start: date_time_start,
          duration: duration,
          exam_code: exam_code,
          prof_email: props.prof_email,
        })
        .then(function (response) {
          console.log(response);
          swal("L'examen a été créé. Votre code d'examen a été copié dans votre presse-papiers, veuillez le partager avec les étudiants.");
        })
        .catch(function (error) {
          console.log(error);
          swal("Une erreur s'est produite lors de la création de l'examen");
        });
      
      closeExamDialog();
      
  }

  /**
   * Generates a random code of length 5 to be used as exam code
   */
  function generateCode(){
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      var length = 5;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
      }
      setExamCode(result);
      navigator.clipboard.writeText(result);
  }
  

  return (
      <div style={{ height: "100%"}} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Bonjour ,</b> {props.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Vous pouvez programmer un examen et consulter les informations des examens précédents. 
              </p>
            </h4>
            <button
              style={{
                width: "300px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={openExamDialog}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Programmer un examen
            </button>
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginLeft:"10px",
                marginTop: "1rem"
              }}
              onClick={props.logoutUser}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Déconnecter
            </button>
            <br/>
            <br/>
            <LogsTable exam_code={exam_code_search} prof_email={props.prof_email}/>
            

            
            <Dialog open={examDialogOpen} onClose={closeExamDialog} aria-labelledby="form-dialog-title" repositionOnUpdate={false}
            style={{ padding: '10px 10px 10px 10px' }}>
            <DialogTitle id="form-dialog-title" >Créer examen</DialogTitle>
            <DialogContent margin="20px" style={{ padding: "30px" }}>
              <DialogContentText>
                  Renseigner les details de l'examen. Appuyer sur Generer pour generer un code et partager le avec vos etudinats ou eleves ou collaborateurs.
              </DialogContentText>

              <br />
              <div>
                 <DatePicker
                    onChange={(e)=> setDateTimeStart(e.target.value)}
                    value={date_time_start}
                 />
              </div>

              <TextField
                  padding="10px"
                  margin="dense"
                  variant="standard"
                  id="name"
                  label="Titre de l'examen"
                  type="text"
                  fullWidth
                  required={true}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
              />
              <TextField
                  id="examLink"
                  name="examLink"
                  label="Lien examen"
                  margin="dense"
                  variant="standard"
                  value={exam_link}
                  onChange={(e)=> setExamLink(e.target.value)}
                  required={true}
                  fullWidth
              />
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
              {/* </LocalizationProvider> */}
              <TextField
                  id="duration"
                  name="duration"
                  label="Durée de l'examen  (minutes)"
                  margin="dense"
                  variant="standard"
                  value={duration}
                  onChange={(e)=> setDuration(e.target.value)}
                  required={true}
                  minDate={new Date()}
                  minTime={new Date(0, 0, 0, 8)}
              />
              <TextField
                  id="exam_code"
                  name="exam_code"
                  label="Code examen"
                  margin="dense"
                  variant="standard"
                  value={exam_code}
                  disabled={true}
                  onChange={(e)=> setExamCode(e.target.value)}
                  required={true}
                  fullWidth
              />
              <p style={{ color: "red" }}> {errorText}</p>
              <Button onClick={generateCode}>Générer un code pour l'examen</Button>
              </DialogContent>
              <DialogActions>
              <Button onClick={closeExamDialog} color="secondary">
                  Annuler
              </Button>
              <Button onClick={createExam} color="primary">
                  Enregistrer
              </Button>
              </DialogActions>
            </Dialog>
            
          </div>
        </div>
        
      </div>
      

    );
};
ProfDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(ProfDashboard);