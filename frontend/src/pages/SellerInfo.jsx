import { useState, useEffect } from "react"
import axios from "axios"
// import { Link } from "react-router-dom"
// import { AiOutlineArrowLeft } from "react-icons/ai"
// import axios from "axios"
import PasswordModal from "../components/PasswordModal"
import EmailModal from "../components/EmailModal"
import UserAdmin from "./UserAdmin"

export default function SellerInfo({ setIsConnected }) {
  // const previousPage = () => {
  //   window.history.back()
  // }

  // const [userInfo1, setUserInfo1] = useState([])
  // const [isLoading1, setIsLoading1] = useState(false)
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [userData, setUserData] = useState([])

  const storedUserId = localStorage.getItem("userId")

  useEffect(() => {
    if (storedUserId) {
      axios.get(`http://localhost:4242/user/${storedUserId}`).then((res) => {
        setUserData(res.data)
      })
    }
  }, [])

  // const getData = () => {
  //   axios
  //     .get("https://randomuser.me/api?nat=en")
  //     .then((res) => setUserInfo1(res.data.results[0]))
  //     .then((res) => setIsLoading1(true))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  // const handleDisconnect = (e) => {
  //   e.preventDefault()
  //   axios
  //     .get("http://localhost:4242/logout", { withCredentials: true })
  //     .then(() => {
  //       setIsConnected(false)
  //     })
  // }

  return (
    <div className="sellerInfo">
      {/* <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button> */}
      <div className="infoSection">
        <h2>Mes informations</h2>
        <UserAdmin setIsConnected={setIsConnected} />
        <form className="adminForm">
          <div className="lastnameContainer">
            <label>
              <span className="enterLastname">Nom</span>
              <input type="text" value={userData.lastname} />
            </label>
          </div>
          <div className="firstnameContainer">
            <label>
              <span className="enterFirstname">Prénom</span>
              <input type="text" value={userData.firstname} />
            </label>
          </div>
          <div className="businessContainer">
            <label>
              <span className="enterBusiness">Société</span>
              <input type="text" placeholder="Votre société" />
            </label>
          </div>
          <div className="addressContainer">
            <label>
              <span className="enterAddress">Adresse</span>
              <input type="text" placeholder="Votre adresse" />
            </label>
          </div>
          <div className="postCode">
            <label>
              <span className="enterPostCode">Code postal</span>
              <input type="number" placeholder="Votre code postal" />
            </label>
          </div>
          <div className="city">
            <label>
              <span className="enterCity">Ville</span>
              <input type="text" placeholder="Votre ville" />
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
