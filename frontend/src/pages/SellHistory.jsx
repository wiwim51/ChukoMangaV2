// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import {
  HiOutlineShoppingBag,
  HiOutlineUserAdd,
  HiOutlineCreditCard,
} from "react-icons/hi"
import narutoImg from "../assets/images/narutodetail.png"
import onePieceImg from "../assets/images/onePiece.png"
import berserkImg from "../assets/images/Berserk2.jpg"
import fmaImg from "../assets/images/FullMetalAlchemist.jpg"
// import axios from "axios"
import UserAdmin from "./UserAdmin"

export default function SellHistory() {
  const previousPage = () => {
    window.history.back()
  }

  // const [userInfo1, setUserInfo1] = useState([])
  // const [isLoading1, setIsLoading1] = useState(false)

  // const getData = () => {
  //   axios
  //     .get("https://randomuser.me/api?nat=en")
  //     .then((res) => setUserInfo1(res.data.results[0]))
  //     .then((res) => setIsLoading1(true))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <div className="sellHistory">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Mes ventes terminées</h2>
      <div className="sellSection">
        <UserAdmin />

        <div className="sellsBoard">
          <div className="sellsStatistics">
            <div className="totalSales">
              <div className="totalSales_title">
                <HiOutlineShoppingBag className="icon" />{" "}
                <h3>Total des ventes</h3>
              </div>
              <p>379.55€</p>
            </div>
            <div className="visitors">
              <div className="visitors_title">
                <HiOutlineUserAdd className="icon" /> <h3>Visiteurs</h3>
              </div>
              <p>433</p>
            </div>
            <div className="totalOrders">
              <div className="totalOrders_title">
                <HiOutlineCreditCard className="icon" />{" "}
                <h3>Total des commandes</h3>
              </div>
              <p>25</p>
            </div>
          </div>
          <div className="sellsDetail">
            <div className="sellsList">
              <p>2944505</p>
              <img
                className="mangaImg"
                src={narutoImg}
                alt="Jaquette de manga"
              />
              <div className="mangaDetail">
                <p>Naruto</p>
                <p>1</p>
              </div>
              <div className="clientDetail">
                <p>Jean Pipeau</p>
                <p>11/03/2023</p>
              </div>
              <p>5.99€</p>
            </div>
            <div className="sellsList">
              <p>3849560</p>
              <img
                className="mangaImg"
                src={onePieceImg}
                alt="Jaquette de manga"
              />
              <div className="mangaDetail">
                <p>One Piece</p>
                <p>5</p>
              </div>
              <div className="clientDetail">
                <p>Alexcro</p>
                <p>21/03/2023</p>
              </div>
              <p>2.95€</p>
            </div>
            <div className="sellsList">
              <p>5689438</p>
              <img
                className="mangaImg"
                src={berserkImg}
                alt="Jaquette de manga"
              />
              <div className="mangaDetail">
                <p>Berserk</p>
                <p>2</p>
              </div>
              <div className="clientDetail">
                <p>DavidO</p>
                <p>18/03/2023</p>
              </div>
              <p>6.50€</p>
            </div>
            <div className="sellsList">
              <p>9584039</p>
              <img className="mangaImg" src={fmaImg} alt="Jaquette de manga" />
              <div className="mangaDetail">
                <p>FMA</p>
                <p>3</p>
              </div>
              <div className="clientDetail">
                <p>Jonathan</p>
                <p>12/03/2023</p>
              </div>
              <p>6.99€</p>
            </div>
          </div>
          <table className="sellsTable">
            <thead>
              <tr>
                <th>N° de commande</th>
                <th>Image</th>
                <th>Série</th>
                <th>Tome n°</th>
                <th>État</th>
                <th>Client</th>
                <th>Date de la commande</th>
                <th>Destination</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2944505</td>
                <td>
                  <img
                    className="mangaImg"
                    src={narutoImg}
                    alt="Jaquette de manga"
                  />
                </td>
                <td>Naruto</td>
                <td>1</td>
                <td>Bon</td>
                <td>Jean Pipeau</td>
                <td>11/03/2023</td>
                <td>Paris</td>
                <td>5.99€</td>
              </tr>
              <tr>
                <td>3849560</td>
                <td>
                  <img
                    className="mangaImg"
                    src={onePieceImg}
                    alt="Jaquette de manga"
                  />
                </td>
                <td>One Piece</td>
                <td>5</td>
                <td>Satisfaisant</td>
                <td>Alexcro</td>
                <td>21/03/2023</td>
                <td>Lyon</td>
                <td>2.95€</td>
              </tr>
              <tr>
                <td>5689438</td>
                <td>
                  <img
                    className="mangaImg"
                    src={berserkImg}
                    alt="Jaquette de manga"
                  />
                </td>
                <td>Berserk</td>
                <td>2</td>
                <td>Très bon</td>
                <td>DavidO</td>
                <td>18/03/2023</td>
                <td>Pornic</td>
                <td>6.50€</td>
              </tr>
              <tr>
                <td>9584039</td>
                <td>
                  <img
                    className="mangaImg"
                    src={fmaImg}
                    alt="Jaquette de manga"
                  />
                </td>
                <td>Full Metal Alchemist</td>
                <td>3</td>
                <td>Neuf</td>
                <td>Jonathan</td>
                <td>12/03/2023</td>
                <td>Aix-en-Provence</td>
                <td>6.99€</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="userRequestList"></div>
      </div>
    </div>
  )
}
