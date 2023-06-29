export default function EmailModal({ emailCloseModal }) {
  return (
    <div className="emailModalBackground">
      <div className="emailModalContainer">
        <div className="titleCloseButton">
          <button
            className="emailModalCloseBtn"
            onClick={() => emailCloseModal(false)}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="emailTitle">
          <h1>Changer d'adresse email</h1>
          {/* <p>Veuillez remplir les informations suivantes</p> */}
        </div>
        <div className="emailBody">
          <form className="emailForm">
            <div className="newEmailContainer">
              <label>
                <span>Nouvelle adresse email</span>
                <input type="email" className="emailInput" />
              </label>
            </div>
            <div className="confirmEmailContainer">
              <label>
                <span>Confirmer l'adresse email</span>
                <input type="email" className="emailInput" />
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
