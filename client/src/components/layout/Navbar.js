import React from "react";
import { Link } from "react-router-dom";
import logo from './logo_app.png';
/**
 * Crée la barre de navigation qui est collée en haut et présente sur
 * toutes les pages
 */
export default function Navbar() {
  return (
    <div className="navbar-fixed" >
    <nav className="z-depth-0" >
      <div className="nav-wrapper white" >
        <Link
          to="/"
          style={{
            fontFamily: "monospace",

          }}
          className="col s5 brand-logo center black-text"
        >
          <img src={logo} alt="Logo" />
          <br>
          </br>
          {/* Face School Tracking */}
        </Link>        
      </div>      
    </nav>
  </div>
  );
}
