import { AiOutlineArrowLeft } from "react-icons/ai"

export default function ChangeEmail() {
  const previousPage = () => {
    window.history.back()
  }
  return (
    <div className="changeYourEmail">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Changer mon adresse email</h2>
      <form className="mailForm">
        <label>
          <span>Email :</span>
          <input type="email" />
        </label>
        <label>
          <span>Confirmez votre email :</span>
          <input type="email" />
        </label>
        <div className="submitBtn">
          <input type="submit" className="submitButton" value="Modifier" />
        </div>
      </form>
    </div>
  )
}
