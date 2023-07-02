import React, { useState , useEffect } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import 'animate.css';

function StudentDashboard(props) {
    const handle = useFullScreenHandle();
    //const [isFullscreen, setIsFullscreen] = useState(false);
    const [isFullscreen, setFullscreen] = useState(false)
    const [exam_code, setExamCode] = useState("");
    const [error, setError] = useState("");

    const axios = require("axios");
    const moment = require("moment");
    const history = useHistory();

    /**
         * Cette fonction est appelée lorsque l'étudiant entre le code de l'examen pour commencer l'examen.
         * Elle vérifie le code de l'examen, si celui-ci n'est pas valide, elle affiche une erreur.
         * Si le code est valide, elle utilise l'heure de début et la durée pour déterminer si l'examen est en cours ou non.
         * Si l'examen est en cours, elle permet à l'étudiant d'entrer, sinon elle affiche une erreur.
     */
    function checkExamCode(){

        // envoyer le code d'examen au serveur
        axios.get('/api/exams/examByCode?exam_code='+exam_code)
        .then(function (response) {
            // if exam code is right
            console.log(response);
            let date_string = response.data.date_time_start;
            const exam_date_time_start = new Date(date_string);
            const exam_date_time_end = moment(exam_date_time_start).add(response.data.duration, 'm').toDate();
            console.log('exam_date_time_end ---: ', exam_date_time_end)
            const curr_date_time = new Date();

            // si l'examen a commencé mais n'est pas terminé, permettre à l'utilisateur de s'inscrire
            if(curr_date_time >= exam_date_time_start && curr_date_time < exam_date_time_end){
                
              // calculer le temps restant
                var diff = Math.abs(exam_date_time_end - curr_date_time);
                var diff_mins = Math.floor((diff/1000)/60);
                var diff_secs = Math.floor(diff/1000)%60;
                console.log(diff, diff_mins, diff_secs);
                setError("Starting exam");
                // transmettre les données à la page d'examen et démarrer l'examen
                let data={
                    exam_code: exam_code,
                    student_name: props.name,
                    student_email: props.student_email,
                    exam_link: response.data.exam_link,
                    prof_email: response.data.prof_email,
                    mins_left: diff_mins,
                    secs_left: diff_secs,
                };
                history.push({ 
                    pathname: '/test',
                    state: data
                })
                // on lance le mode fullscreen
                document.documentElement.requestFullscreen()
                .then(
                    Swal.fire({
                          title: "Le mode Plein Ecran est ACTIVE",
                          text: "Ne la quitter en aucun cas durant l'examen",
                          type: "info"
                    })
                )
            }

            // si l'heure actuelle est postérieure à l'heure de fin de l'examen, afficher une erreur
            else if(curr_date_time >= exam_date_time_end){
                setError("L'Examen est déja terminé");
            }
            // si l'heure actuelle est antérieure au début de l'examen, afficher l'erreur
            else {
                setError("L'examen n'a pas encore démarré");
                Swal.fire({
                  title: "L'examen n'a pas encore démarré",
                  text: "Verifer la date exacte avant d'y accéder ",
                  type: "info"
                })

            }
          })

          .catch(function (error) {
            // Si le code d'examen n'est pas valide, afficher l'erreur
            console.log(error);
            setError("Code examen invalide");
          });
    }

    return (
        <div style={{ height: "75vh"}} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Bonjour,</b> {props.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  Entrer le code de l'examen et Démarrer votre examen
                </p>
              </h4>
                <TextField
                autoFocus
                padding="10px"
                margin="20px"
                variant="standard"
                id="exam_code"
                label="Exam Code"
                type="text"
                required={true}
                value={exam_code}
                onChange={(e)=>setExamCode(e.target.value)}
                />
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginLeft:"1rem",
                  borderRadius: "25px"
                }}
                onClick={checkExamCode}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Démarrer l'Examen
              </button>
              <button
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginLeft:"1rem",
                  borderRadius: "25px"
                }}
                onClick={props.logoutUser}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
              >
                Déconnecter
              </button>
              <br/>
              <p style={{ color: "red" }}>{error}</p>
            </div>
        </div>
        </div>

    )
}
StudentDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(StudentDashboard);