import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import axios from "axios"
import { AiOutlineArrowLeft } from "react-icons/ai"

export default function Register() {
  const previousPage = () => {
    window.history.back()
  }

  const inputEmailRef = useRef(null)
  const inputPasswordRef = useRef(null)
  const inputPassword2Ref = useRef(null)

  const [cgu, setCgu] = useState(false)

  const handleCheckCgu = () => {
    setCgu(!cgu)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      inputPasswordRef.current.value !== inputPassword2Ref.current.value ||
      cgu === false ||
      inputEmailRef.current.value === ""
    ) {
      alert("Veuillez remplir tous les champs")
      return
    }
    axios.post(
      "http://localhost:4242/register-user",
      {
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
      },
      inputPassword2Ref.current.value
    )
  }

  return (
    <div className="register">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2 className="registerTitle">S'inscrire</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="emailContainer">
          <label>
            <span className="enterEmail">Entrez votre adresse email :</span>
            <input type="email" ref={inputEmailRef} />
          </label>
        </div>
        <div className="passwordContainer">
          <label>
            <span className="enterPassword">Entrez votre mot de passe :</span>
            <input type="password" ref={inputPasswordRef} />
          </label>
          <label>
            <span className="enterSndPassword">
              Confirmez votre mot de passe :
            </span>
            <input type="password" ref={inputPassword2Ref} />
          </label>
        </div>
        <div className="registerFormLinks">
          <label className="labelCheckbox">
            <input
              type="checkbox"
              className="check"
              onClick={() => handleCheckCgu()}
            />
            <span className="acceptCGU">
              J'accepte les{" "}
              <Link to={"/"}>conditions générales d'utilisation</Link>
            </span>
          </label>
        </div>

        <div className="submitBtn">
          <input type="submit" className="submitButton" value="Confirmer" />
        </div>
      </form>
    </div>
  )
}
