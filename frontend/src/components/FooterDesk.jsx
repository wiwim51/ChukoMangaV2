import { useContext } from "react"
import { Link } from "react-router-dom"
import ReactSwitch from "react-switch"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"

import { ThemeContext } from "../App.jsx"

export default function FooterDesk() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div className="footerDesktop">
      <div className="switch">
        <ReactSwitch
          className="react-switch"
          onChange={toggleTheme}
          checked={theme === "light"}
          height={40}
          width={90}
          handleDiameter={28}
          offColor="#8080c0"
          onColor="#ff8040"
          checkedIcon={<HiOutlineSun className="sunIconDesk" />}
          uncheckedIcon={<HiOutlineMoon className="moonIconDesk" />}
          activeBoxShadow="0px 0px 1px 2px #ffffff"
        />
      </div>
      <div className="termsOfUse">
        <p>Conditions générales de vente</p>
      </div>
      <Link to={"/"}>
        <h1 className="brand">
          <span className="romaji">Chuko Manga</span>{" "}
          <span className="kana"> 中古マンガ</span>
        </h1>
      </Link>
      <div className="partners">
        <ul>
          <li>Partenaires:</li>
          <li> Manga Story: 13 Bd Voltaire, 75011 Paris</li>
          <li>Momie Manga: 38 rue Saint Jacques, 75005 Paris</li>
        </ul>
      </div>
    </div>
  )
}
