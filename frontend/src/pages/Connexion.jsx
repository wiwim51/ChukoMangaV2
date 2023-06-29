import { Link } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"
import { AiOutlineArrowLeft } from "react-icons/ai"
import UserAdmin from "./UserAdmin"

export default function Connexion({ isConnected, setIsConnected, setUserId }) {
  const previousPage = () => {
    window.history.back()
  }

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
      })
  }

  return (
    <>
      {isConnected ? (
        <UserAdmin setIsConnected={setIsConnected} />
      ) : (
        <div className="connexion">
          <button className="arrow-left-cart" onClick={previousPage}>
            <AiOutlineArrowLeft className="ArrowLeft" />
          </button>
          <h2 className="connectTitle">Se Connecter</h2>
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
              <Link to="/forgotten-password">
                <p>Mot de passe oublié ?</p>
              </Link>
            </div>
            <div className="registerLink">
              <p>
                Vous n'avez pas de compte ?{" "}
                <Link to="/register">Inscrivez-vous !</Link>
              </p>
            </div>

            <div className="submitBtn">
              <input type="submit" className="submitButton" value="Confirmer" />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
