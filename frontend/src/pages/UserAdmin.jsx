import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from "axios"

export default function UserAdmin({ setIsConnected }) {
  const previousPage = () => {
    window.history.back()
  }
  const navigate = useNavigate()

  // const [userInfo1, setUserInfo1] = useState([])
  // const [isLoading1, setIsLoading1] = useState(false)
  // const [imageLoaded, setImageLoaded] = useState(false)
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

  // useEffect(() => {
  //   if (isLoading1 && !imageLoaded) {
  //     setImageLoaded(true)
  //   }
  // }, [isLoading1, imageLoaded])

  const handleDisconnect = (e) => {
    e.preventDefault()
    axios
      .get("http://localhost:4242/logout", { withCredentials: true })
      .then(() => {
        setIsConnected(false)
        navigate("/")
        localStorage.clear("isConnected")
      })
  }

  return (
    <div className="userAdmin">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <div className="userSection">
        <div className="userBoardSection">
          <div className="adminProfile">
            <div className="adminName">
              <p>Jean Kirstein</p>
            </div>
            <div className="adminImg">
              <img src={userData.avatar} />
              <p>Changer mon avatar</p>
            </div>
          </div>
          <ul className="boardList">
            <Link to={"/sellerinfo"}>
              <li>Mes informations</li>
            </Link>
            <Link to={"/productsell"}>
              <li>Mettre en vente</li>
            </Link>
            <Link to={"/mesventes"}>
              <li>Mes ventes en cours</li>
            </Link>
            <Link to={"/sellHistory"}>
              <li>Historique des commandes</li>
            </Link>
            <Link to={"/messagehistory"}>
              <li>Historique des messages</li>
            </Link>
            <Link to={"/hotline"}>
              <li>Hotline</li>
            </Link>
          </ul>
          <div className="btn__disconnect__container">
            <button className="btn__disconnect" onClick={handleDisconnect}>
              se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
