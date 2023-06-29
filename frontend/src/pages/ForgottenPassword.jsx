import { AiOutlineArrowLeft } from "react-icons/ai"

export default function ForgottenPassword() {
  const previousPage = () => {
    window.history.back()
  }
  return (
    <div className="fgtnPassword">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2 className="passwordTitle">Mot de passe oublié ?</h2>
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
  )
}
