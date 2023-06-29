import { useState } from "react"
import { Link } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="burgerMenu">
      <button className="buttonMenu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <RxCross2 /> : <BiMenu />}
      </button>
      <nav>
        <div className="listMenuDiv">
          <ul
            className="listMenu"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <Link to="/">
              <li
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <a href="#">Notre Catalogue</a>
              </li>
            </Link>
            <Link to={"/sellerpage"}>
              <li
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <a href="#">Mon profile</a>
              </li>
            </Link>
            <Link to={"/request"}>
              <li
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <a href="#">Mes demandes</a>
              </li>
            </Link>
            <Link to="/detailproduit">
              <li
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <a href="#">Aide</a>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default BurgerMenu
