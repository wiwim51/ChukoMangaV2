import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function LogoutModal({ setIsConnected, setLoginModal }) {
  const navigate = useNavigate()

  const handleDisconnect = (e) => {
    e.preventDefault()
    axios
      .get("http://localhost:4242/logout", { withCredentials: true })
      .then(() => {
        setIsConnected(false)
        setLoginModal(false)
        navigate("/")
        localStorage.clear("isConnected")
      })
  }
  const handleClose = () => {
    setLoginModal(false)
  }
  return (
    <>
      <div className="logout__modal__container">
        <div className="access__profile">
          <Link
            to={"/sellerinfo"}
            onClick={handleClose}
            className="link__logout__modal"
          >
            Mon profile
          </Link>
        </div>
        <div className="logout__account">
          <button className="btn__logout__modal" onClick={handleDisconnect}>
            Déconnexion
          </button>
        </div>
      </div>
    </>
  )
}
