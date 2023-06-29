import { useRef } from "react"
import axios from "axios"

export default function ConnectModal({
  closeModal,
  setShowRegisterModal,
  setShowFgtnPasswordModal,
  setIsConnected,
  setUserId,
}) {
  const inputEmailRef = useRef(null)
  const inputPasswordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        "http://localhost:4242/login",
        {
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setIsConnected(
          localStorage.setItem("isConnected", JSON.stringify(true))
        )
        setUserId(
          localStorage.setItem("userId", JSON.stringify(res.data.userId))
        )
        closeModal(false)
      })
  }

  return (
    <div className="connectModalBackground">
      <div className="connectModalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Se Connecter</h1>
        </div>
        <div className="body">
          <form className="connexionForm" onSubmit={handleSubmit}>
            <div className="emailContainer">
              <label>
                <span className="enterEmail">Entrez votre adresse email :</span>
                <input type="email" ref={inputEmailRef} />
              </label>
            </div>
            <div className="passwordContainer">
              <label>
                <span className="enterPassword">
                  Entrez votre mot de passe :
                </span>
                <input type="password" ref={inputPasswordRef} />
              </label>
            </div>
            <div className="formLinks">
              <label className="labelCheckbox">
                <input type="checkbox" className="check" />
                <span className="stayConnected">Rester connecté</span>
              </label>
              <button
                type="button"
                className="/forgotten-password"
                onClick={() => {
                  setShowFgtnPasswordModal(true)
                  closeModal(false)
                }}
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="registerLink">
              <p>
                Vous n'avez pas de compte ?{" "}
                <button
                  type="button"
                  className="registerButton"
                  onClick={() => {
                    setShowRegisterModal(true)
                    closeModal(false)
                  }}
                >
                  Inscrivez-vous !
                </button>
              </p>
            </div>
            <div className="submitBtn">
              <input type="submit" className="submitButton" value="Connexion" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
