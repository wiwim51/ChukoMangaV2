export default function PasswordModal({ passwordCloseModal }) {
  return (
    <div className="passwordModalBackground">
      <div className="passwordModalContainer">
        <div className="titleCloseButton">
          <button
            className="passwordModalCloseBtn"
            onClick={() => passwordCloseModal(false)}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="passwordTitle">
          <h1>Changer de mot de passe</h1>
          {/* <p>Veuillez remplir les informations suivantes</p> */}
        </div>
        <div className="passwordBody">
          <form className="passwordForm">
            <div className="currentPasswordContainer">
              <label>
                <span>Mot de passe actuel</span>
                <input type="password" className="passwordInput" />
              </label>
            </div>
            <div className="newPasswordContainer">
              <label>
                <span>Nouveau mot de passe</span>
                <input type="password" className="passwordInput" />
              </label>
            </div>
            <div className="confirmPasswordContainer">
              <label>
                <span>Confirmer le mot de passe</span>
                <input type="password" className="passwordInput" />
              </label>
            </div>
            <div className="submitBtn">
              <input type="submit" className="submitButton" value="Modifier" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
