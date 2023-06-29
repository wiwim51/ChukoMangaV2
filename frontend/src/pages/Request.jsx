import { AiOutlineArrowLeft } from "react-icons/ai"
export default function Request() {
  const previousPage = () => {
    window.history.back()
  }
  return (
    <div className="request">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Créer une demandes</h2>
      <p>Veuillez remplir les informations suivantes</p>
      <form className="requestForm">
        <div className="volumeContainer">
          <label>
            <span>Quel tome recherchez-vous ?</span>
            <input type="text" />
          </label>
        </div>
        <div className="priceContainer">
          <label>
            <span>Indiquez un prix d'achat</span>
            <input type="text" />
          </label>
        </div>
        <div className="conditionContainer">
          <label>
            <span>Indiquez l'état attendu</span>
            <input type="text" />
          </label>
        </div>
        <div className="submitBtn">
          <input type="submit" className="submitButton" value="Confirmer" />
        </div>
      </form>
    </div>
  )
}
