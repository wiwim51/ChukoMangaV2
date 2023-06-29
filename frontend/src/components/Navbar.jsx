import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiShoppingCart,
  HiUser,
  HiOutlineSearch,
} from "react-icons/hi"
import { BsPersonCheckFill } from "react-icons/bs"
import axios from "axios"
import ConnectModal from "./ConnectModal"
import ForgottenPasswordModal from "./ForgottenPasswordModal"
import RegisterModal from "./RegisterModal"
import LogoutModal from "./LogoutModal"

import { ThemeContext } from "../App.jsx"

export default function Navbar({
  countCart,
  setIsConnected,
  isConnected,
  setUserId,
}) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [searchText, setSearchText] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showFgtnPasswordModal, setShowFgtnPasswordModal] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const [LoginModal, setLoginModal] = useState(false)

  const handleLogout = () => {
    setLoginModal(true)
    if (LoginModal) {
      setLoginModal(false)
    }
  }

  const fetchSuggestions = async (query) => {
    const response = await axios.get("http://localhost:4242/serie")
    const allSeries = response.data
    const filteredSeries = allSeries.filter((serie) =>
      serie.name.toLowerCase().includes(query.toLowerCase())
    )
    setSuggestions(filteredSeries)
  }

  const handleSearch = (searchValue) => {
    if (searchValue && searchValue !== "Aucune suggestion") {
      navigate(`/seriesdescription?search=${searchValue}`)
      setSearchText("")
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    if (searchText) {
      fetchSuggestions(searchText)
    } else {
      setSuggestions([])
    }
  }, [searchText])

  return (
    <div className="Nav">
      <Link to={"/"}>
        <h1 className="headerTitle">
          <span className="orange">Chuko Manga</span>{" "}
          <span className="purple">中古マンガ</span>
        </h1>
      </Link>
      <div className="ulContainer">
        <ul className="navToolDesk">
          <Link to="/">
            <li>Nouveautés</li>
          </Link>
          <Link to={"/requestlist"}>
            <li>Demandes</li>
          </Link>
          <Link to={"/hotline"}>
            <li>Aide</li>
          </Link>
        </ul>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Type your search here..."
          name="q"
          value={searchText}
          autoComplete="off"
          onClick={() => setShowDropdown(!showDropdown)}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {showDropdown && (
          <div className="suggestions-dropdown">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  className="option-settings"
                  key={index}
                  value={suggestion.name}
                  onClick={() => {
                    handleSearch(suggestion.name)
                    setShowDropdown(false)
                  }}
                >
                  {suggestion.name}
                </div>
              ))
            ) : (
              <div className="option-settings-notfound">
                Aucune suggestion trouvée
              </div>
            )}
          </div>
        )}

        <button type="submit">
          <HiOutlineSearch className="searchButton" />
        </button>
      </div>

      <div className="deskNavIcons">
        {isConnected ? (
          <BsPersonCheckFill className="userIconNav" onClick={handleLogout} />
        ) : (
          <HiUser
            className="userIconNav"
            onClick={() => {
              setOpenModal(true)
            }}
          />
        )}
        {LoginModal && (
          <LogoutModal
            setIsConnected={setIsConnected}
            setLoginModal={setLoginModal}
          />
        )}
        {openModal && (
          <ConnectModal
            closeModal={setOpenModal}
            setShowFgtnPasswordModal={setShowFgtnPasswordModal}
            setShowRegisterModal={setShowRegisterModal}
            setIsConnected={setIsConnected}
            isConnected={isConnected}
            setUserId={setUserId}
          />
        )}
        {showFgtnPasswordModal && (
          <ForgottenPasswordModal
            forgottenPasswordCloseModal={setShowFgtnPasswordModal}
            showFgtnPasswordModal={showFgtnPasswordModal}
          />
        )}
        {showRegisterModal && (
          <RegisterModal
            registerCloseModal={setShowRegisterModal}
            showRegisterModal={showRegisterModal}
          />
        )}
        <Link to={"/cart"}>
          <p className="countCart">{countCart}</p>
          <HiShoppingCart className="cartIconNav" />
        </Link>
      </div>
      <div className="themeToggleBtn">
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <HiOutlineSun className="sunIcon" />
          ) : (
            <HiOutlineMoon className="moonIcon" />
          )}
        </button>
      </div>
    </div>
  )
}
