export default function ForgottenPasswordModal({
  forgottenPasswordCloseModal,
  showFgtnPasswordModal,
}) {
  return (
    <div className="fgtnPasswordModalBackground">
      <div className="fgtnPasswordModalContainer">
        <div className="titleCloseButton">
          <button
            className="fgtnPasswordModalCloseBtn"
            onClick={() => forgottenPasswordCloseModal(false)}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="fgtnPasswordTitle">
          <h2 className="passwordTitle">Mot de passe oublié ?</h2>
        </div>
        <div className="fgtnnPasswordBody">
          <form className="passwordForm">
            <div className="emailContainer">
              <label>
                <span className="enterEmail">Entrez votre adresse email :</span>
                <input type="email" />
              </label>
            </div>

            <div className="submitBtn">
              <input type="submit" className="submitButton" value="Confirmer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
