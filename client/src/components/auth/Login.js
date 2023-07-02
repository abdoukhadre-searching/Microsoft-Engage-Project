import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // Si l'utilisateur est déjà connecté, envoyez-le au tableau de bord.
      this.props.history.push("/dashboard");
    }
    // définir les erreurs s'il y en a
    if (nextProps.errors) {

      this.setState({
        errors: nextProps.errors
      });
    }
  }
  componentDidMount() {

    // Si l'utilisateur est connecté et qu'il se rend sur la page de connexion,
    // il doit être redirigé vers le tableau de bord.
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

  }
  /**
     * Fonction combinée de changement pour tous les composants.
     * L'événement d'entrée est utilisé pour obtenir l'identifiant qui est le même que le nom de l'état
     * La valeur de l'état est donc fixée à event.target.value qui est la valeur saisie par l'utilisateur.
     * la valeur saisie par l'utilisateur
     * @param {event} e
     *
     */
  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  /**
     * Cette fonction est déclenchée lorsque l'utilisateur appuie sur le bouton de connexion
     * Elle envoie l'email et le mot de passe à la fonction loginUser dans authActions.js
     * @param {Event} e
     */
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component,
    //nous n'avons pas besoin de passer "this.props.history" en paramètre
  };


  render() {
      const { errors } = this.state;
  return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Retour
              a l'acceuil
              
            </Link>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Se connecter</b> ci-dessous
              </h4>
              <p className="grey-text text-darken-1">
                Pas de compte ? <Link to="/register">Créer un ici</Link>
              </p>
            </div>
            
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Mot de passe</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    borderRadius: "25px"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);