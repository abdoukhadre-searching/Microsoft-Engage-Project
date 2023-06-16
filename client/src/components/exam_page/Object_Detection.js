import React from "react";
import swal from 'sweetalert';
//import count from './Login';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./Detections.css";

/**
 * Il s'agit de la classe de détection d'objets qui utilise l'entrée de la webcam
 * et exécute le modèle coco-ssd pour la détection d'objets.
 */
export default class Detection extends React.Component {
  // Create video and canvas reference
  videoRef = React.createRef();
  canvasRef = React.createRef();

  constructor(props) {
    super(props);
    // compte avec le context applicatif et stocke le nombre d'images passées depuis que la face n'est pas visible
    this.state = {count: 0};
  }

  /**
   * "ComponentDidMount" S'exécute lorsque le composant est chargé pour la première fois
   * Il configure l'entrée de la webcam, charge le modèle et appelle DetectFrame, qui est une fonction récursive.
   * une fonction récursive, de sorte que la détection se poursuive tout au long du test
   */
  componentDidMount() {
    // configuration de l'entrée de la webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: 800,
            height: 400
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      // charger le modèle et appeler la fonction detectFrame
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  /**
   * Utiliser le modèle pour détecter les objets dans le cadre, passer les prédictions
   * à la fonction renderPredictions, puis appeler à nouveau detectFrame
   * @param {videoRef} video 
   * @param {ModelPromise} model 
   */
  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {

      if (this.canvasRef.current) {
        
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      } else {
        return false;
      }
    });
  };
  
  renderPredictions = predictions => {
    
    // configuration du canevas pour le dessin de rectangles et l'impression
    // prediction text
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "16px sans-serif";
    ctx.textBaseline = "top";

    // boucler sur les prédictions et dessiner la boîte englobante pour chaque objet
    // et l'arrière-plan de l'étiquette de texte
    predictions.forEach(prediction => {

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Dessinez la boîte de cadrage.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Dessinez l'arrière-plan de l'étiquette.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt("16px sans-serif", 10); // base 10
      ctx.fillRect(x, y, textWidth + 8, textHeight + 8);
      
    });

    // Passer en revue toutes les prédictions et dessiner du texte (classe de prédiction)
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      
      ctx.fillStyle = "#000000";

      // Draw the text last to ensure it's on top.
      if (prediction.class === "person" || prediction.class === "cell phone" || prediction.class === "book" || prediction.class === "laptop") {
        ctx.fillText(prediction.class, x, y);
      }
    });
    
    var faces = 0;
      // si le visage n'est pas visible pendant 50 images consécutives, l'élève est
      // n'est pas devant l'ordinateur, lancer une erreur.
      if (predictions.length === 0 && this.state.count <50){
        this.state.count++;
      }
      else if (predictions.length === 0) {
        this.state.count=0;
        swal("Visage introuvable", "Cette action a été enregistrée", "error");
        this.props.FaceNotVisible();
      }

      // boucler sur toutes les prédictions et vérifier si le téléphone portable, le livre,
      // l'ordinateur portable ou plusieurs personnes sont présents dans le cadre.
      // personnes sont présentes dans le cadre
      for (let i = 0; i < predictions.length; i++) {

        if (predictions[i].class === "cell phone") {
          this.props.MobilePhone();
          swal("Téléphone détectée", "Cette action a été enregistrée", "error");
          
        }

        else if (predictions[i].class === "book" || predictions[i].class === "laptop") {
          this.props.ProhibitedObject();
          swal("Objets interdits détecté", "Cette action a été enregistrée", "error");
          
        }
        
        else if (predictions[i].class === "person") {
          faces += 1;
          this.state.count=0;
        }

      }
      if(faces > 1){
        this.props.MultipleFacesVisible();
        swal(faces.toString()+" personnes Détectées", "Cette action a été enregistrée", "error");
      }

  };

  render() {
    return (
      <div>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width= "800"
          height= "400"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="800"
          height="400"
        />
      </div>
    );
  }
}