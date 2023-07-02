import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './LandingStyle';
import swal from 'sweetalert';

class Landing extends Component {
   /*
   handleFullScreen() {
        document.requestFullscreen().then(console.log("full screen activate ! "));
        swal("Le mode Plein Ecran est activé", "Ne la quitter en aucun cas durant l'examen", "error");
      }
   */



  render() {
    return (
    <HeroSection>
    			<HeroVideo src="./assets/coding.mp4" loop autoPlay muted />
    			<Container>
    			    <img src="../assets/fs.png" alt="Logo" style={{ width: '100%', justifyContent: 'center', marginTop: '-20%' }}/>
    				<MainHeading>Le meilleur outil de surveillance des examens de façon sécurisé et transparente</MainHeading>
    				<HeroText>
    					Une avancé technologique avec l'IA pour l'éducation dans un monde numérique en pleine croissance
    				</HeroText>
    				<ButtonWrapper>
    					<Link to="/login">
    						<Button>Je me connecte</Button>
    					</Link>
    					<Link to="/register">
    					    <HeroButton>Créer un compte</HeroButton>
    					</Link>
    				</ButtonWrapper>
    			</Container>
    </HeroSection>
      /*
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b> Face School Tracking </b> votre plateforme doté d'une IA pour la surveillance des examens de façon sécurisé et transparente avec {" "}
              <span style={{ fontFamily: "monospace" }}>le Proctoring</span>..plus de tricherie durant les examens en ligne !
            </h4>
            <p className="flow-text grey-text text-darken-1">
            Créez un examen, partagez un code unique avec les étudiants et surveillez les tentatives de tricherie en temps réel à partir du tableau de bord. C'est 
            aussi simple que cela !
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Créer un compte
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );*/
    );
  }
}
export default Landing;

