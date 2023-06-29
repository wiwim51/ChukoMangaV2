import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from "axios"

export default function RequestList() {
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
    <div className="requestList">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Mes demandes</h2>
      <div className="requestSection">
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
        <div className="userRequestList">
          <div className="firstRow">
            <div className="request-one">
              <img
                src="https://d29xot63vimef3.cloudfront.net/image/berserk/1-1.jpg"
                alt="manga cover"
              />
              <div className="requestInfo">
                <p>Volume: Tome 1</p>
                <p>Prix: 2.95€</p>
                <p>État: bon</p>
              </div>
            </div>
            <div className="request-two">
              <img
                src="https://d29xot63vimef3.cloudfront.net/image/one-piece/2-1.jpg"
                alt="manga cover"
              />
              <div className="requestInfo">
                <p>Volume: Tome 2</p>
                <p>Prix: 4.80€</p>
                <p>État: neuf</p>
              </div>
            </div>
          </div>
          <div className="secondRow">
            <div className="request-three">
              <img
                src="https://m.media-amazon.com/images/I/51OvkZ5O6bL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
                alt="manga cover"
              />
              <div className="requestInfo">
                <p>Volume: Tome 5</p>
                <p>Prix: 1.50€</p>
                <p>État: satisfaisant</p>
              </div>
            </div>
            <div className="request-four">
              <img
                src="https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
                alt="manga cover"
              />
              <div className="requestInfo">
                <p>Volume: Tome 3</p>
                <p>Prix: 3.99€</p>
                <p>État: très bon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
