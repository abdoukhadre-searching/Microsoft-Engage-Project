import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userType:false,
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    // Si des erreurs sont détectées dans le formulaire, mettre à jour l'état d'erreur pour qu'elles soient visibles par l'utilisateur.
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // Si l'utilisateur est connecté et qu'il navigue vers la page d'inscription, il doit être redirigé vers le tableau de bord.
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  /**
   * Fonction combinée de changement pour tous les composants.
   * L'événement d'entrée est utilisé pour obtenir l'identifiant qui est le même que le nom du State
   * La valeur du State est donc fixée à event.target.value qui est la valeur saisie par l'utilisateur.
   * la valeur saisie par l'utilisateur
   * @param {event} e
   *
   */
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  /**
    * Fonction Toggler pour la page "Si vous etes un instructeur ? Switch"
    * L'événement d'entrée est utilisé pour obtenir l'identifiant qui est le même que le nom de l'état
    * La valeur de l'état est donc fixée à event.target.value qui est la valeur saisie par l'utilisateur.
    * la valeur saisie par l'utilisateur
    * @param {event} e
    */
  onToggle=e=>{
    this.setState({[e.target.id]:!this.state.userType});
  }

/**
   * Cette fonction est déclenchée lorsque l'utilisateur appuie sur le bouton d'enregistrement
   * Cette fonction envoie l'email et le mot de passe à la fonction registerUser dans authActions.js
   * @param {Event} e
   */
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          userType: this.state.userType,
        };
    this.props.registerUser(newUser, this.props.history); 
  };

  
  render() {
      const { errors } = this.state;
  return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Retour à l'acceuil
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Creation de compte </b> ci-dessous
                </h4>
                <p className="grey-text text-darken-1">
                  Déja un compte? <Link to="/login">Se connecter</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    })}
                  />
                  <label htmlFor="name">Nom</label>
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Mot de passe</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirmation de mot de passe</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div class="switch col s12">
                <label>
                  Etes-vous un Instituteur | Enseignant | Professeur ?
                  <input type="checkbox" id = "userType" checked={this.state.userType} onChange={this.onToggle}></input>
                  <span className="lever"></span>
                  
                </label>
              </div>
                
              {  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "250px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      borderRadius: "25px"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                  Créer un compte
                  </button>
                </div>}
              </form>
            </div>
          </div>
        </div>
      );
    }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));