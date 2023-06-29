import { Link } from "react-router-dom"
import { HiHome, HiOutlineSearch, HiShoppingCart, HiUser } from "react-icons/hi"
import BurgerMenu from "./BurgerMenu"

export default function FooterMobile({ countCart }) {
  return (
    <div className="footer">
      <Link to={"/"}>
        <HiHome className="homeIcon" />
      </Link>
      <Link to={"/search"}>
        <HiOutlineSearch className="searchIcon" />
      </Link>
      <BurgerMenu />
      <Link to={"/cart"}>
        <p className="countCart">{countCart}</p>
        <HiShoppingCart className="cartIcon" />
      </Link>
      <Link to={"/connexion"}>
        <HiUser className="userIcon" />
      </Link>
    </div>
  )
}
