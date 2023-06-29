import { useState, useEffect } from "react"
import axios from "axios"

export default function RequestModal({ requestCloseModal }) {
  const [sendRequest, setSendRequest] = useState(false)

  useEffect(() => {
    axios
      .post("http://localhost:4242/request", sendRequest)
      .then((response) => {
        console.info("Demande enregistrée:", response.data)
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission de la demande:", error)
      })
  }, [sendRequest])
  return (
    <div className="requestModalBackground">
      <div className="requestModalContainer">
        <div className="titleCloseButton">
          <button
            className="requestModalCloseBtn"
            onClick={() => requestCloseModal(false)}
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="requestTitle">
          <h1>Créer une demande</h1>
          <p>Veuillez remplir les informations suivantes</p>
        </div>
        <div className="requestBody">
          <form className="requestForm">
            {/* <div className="seriesContainer">
              <label>
                <span>Quelles série vous intérésse ?</span>
                <input type="text" />
              </label>
            </div> */}
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
              <input
                type="submit"
                className="submitButton"
                value="Confirmer"
                onSubmit={setSendRequest}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
