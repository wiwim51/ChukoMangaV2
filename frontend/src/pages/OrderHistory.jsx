import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from "axios"

export default function OrderHistory() {
  const previousPage = () => {
    window.history.back()
  }

  const [userInfo1, setUserInfo1] = useState([])
  const [isLoading1, setIsLoading1] = useState(false)

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
    <div className="orderHistory">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Historique des commandes</h2>
      <div className="orderSection">
        <div className="userBoardSection">
          <div className="userProfile">
            <div className="userName">
              <p>Jean Pipeau</p>
            </div>
            <div className="userImg">
              <img src={isLoading1 ? userInfo1.picture.medium : null} />
              <p>Changer mon avatar</p>
            </div>
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
        <div className="orderList"></div>
      </div>
    </div>
  )
}
