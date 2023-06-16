import React from 'react'
const PageNotFound = () => {

  //Désactiver le click Droit
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  return (<div>
    <center>
      <h3>
        Page introuvable
        </h3>
      <small>
        Cette action a ete enregistrée
        </small>
    </center>
  </div>
  )
}

export default PageNotFound;