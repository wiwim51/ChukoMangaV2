import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from "axios"
import PasswordModal from "../components/PasswordModal"
import EmailModal from "../components/EmailModal"

export default function UserInfo() {
  const previousPage = () => {
    window.history.back()
  }

  const [userInfo1, setUserInfo1] = useState([])
  const [isLoading1, setIsLoading1] = useState(false)
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [openPasswordModal, setOpenPasswordModal] = useState(false)

  const getData = () => {
    axios
      .get("https://randomuser.me/api?nat=en")
      .then((res) => setUserInfo1(res.data.results[0]))
      .then((res) => setIsLoading1(true))
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="userInfo">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <div className="infoSection">
        <h2>Mes informations</h2>
        <div className="userBoardSection">
          <div className="userImg">
            <img src={isLoading1 ? userInfo1.picture.large : null} />
            <p>Changer mon avatar</p>
          </div>
          <ul className="boardList">
            <Link to={"/userinfo"}>
              <li>Mes informations</li>
            </Link>
            <Link to={"/requestlist"}>
              <li>Mes demandes</li>
            </Link>
            <Link to={"/favorites"}>
              <li>Mes favoris</li>
            </Link>
            <Link to={"/orderhistory"}>
              <li>Historique des commandes</li>
            </Link>
            <Link to={"/messagehistory"}>
              <li>Historique des messages</li>
            </Link>
            <Link to={"/help"}>
              <li>Aide</li>
            </Link>
          </ul>
        </div>
        <form className="infoForm">
          <div className="lastnameContainer">
            <label>
              <span className="enterLastname">Nom</span>
              <input type="text" />
            </label>
          </div>
          <div className="firstnameContainer">
            <label>
              <span className="enterFirstname">Prénom</span>
              <input type="text" />
            </label>
          </div>
          <div className="addressContainer">
            <label>
              <span className="enterAddress">Adresse</span>
              <input type="text" />
            </label>
          </div>
          <div className="complementContainer">
            <label>
              <span className="enterComplement">Complément</span>
              <input type="text" />
            </label>
          </div>
          <div className="postCode">
            <label>
              <span className="enterPostCode">Code postal</span>
              <input type="number" />
            </label>
          </div>
          <div className="city">
            <label>
              <span className="enterCity">Ville</span>
              <input type="text" />
            </label>
          </div>
          <div className="country">
            <label>
              <span className="enterCounrty">Pays</span>
              <input type="text" />
            </label>
          </div>
          <div className="infoLinks">
            <p
              className="mailChange"
              onClick={() => {
                setOpenEmailModal(true)
              }}
            >
              Changer mon adresse email
            </p>
            {openEmailModal && (
              <EmailModal emailCloseModal={setOpenEmailModal} />
            )}
            <p
              className="passwordChange"
              onClick={() => {
                setOpenPasswordModal(true)
              }}
            >
              Changer mon mot de passe
            </p>
            {openPasswordModal && (
              <PasswordModal passwordCloseModal={setOpenPasswordModal} />
            )}
          </div>
          <div className="submitBtn">
            <input type="submit" className="submitButton" value="Modifier" />
          </div>
        </form>
      </div>
    </div>
  )
}
