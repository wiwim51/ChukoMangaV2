import { AiOutlineArrowLeft } from "react-icons/ai"

export default function ChangePassword() {
  const previousPage = () => {
    window.history.back()
  }
  return (
    <div className="changeYourPassword">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Changer mon mot de passe</h2>
      <form className="passwordForm">
        <label>
          <span>Mot de passe actuel :</span>
          <input type="password" />
        </label>
        <label>
          <span>Nouveau mot de passe :</span>
          <input type="password" />
        </label>
        <label>
          <span>Confirmez votre nouveau mot de passe :</span>
          <input type="password" />
        </label>
        <div className="submitBtn">
          <input type="submit" className="submitButton" value="Modifier" />
        </div>
      </form>
    </div>
  )
}
