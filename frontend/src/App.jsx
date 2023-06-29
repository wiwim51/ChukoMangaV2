import DetailProduit from "./pages/DetailProduit"
import { Routes, Route } from "react-router-dom"
import { createContext, useState, useEffect } from "react"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import FooterMobile from "./components/FooterMobile"
import SearchBar from "./pages/SearchBar"
import SeriesDescription from "./pages/SeriesDescription"
import Connexion from "./pages/Connexion"
import Register from "./pages/Register"
import ForgottenPassword from "./pages/ForgottenPassword"
import Cart from "./pages/Cart"
import UserLambda from "./pages/UserLambda"
import UserInfo from "./pages/UserInfo"
import ChangeEmail from "./pages/ChangeEmail"
import ChangePassword from "./pages/ChangePassword"
import Request from "./pages/Request"
import RequestList from "./pages/RequestList"
import Favorites from "./pages/Favorites"
import OrderHistory from "./pages/OrderHistory"
import MessageHistory from "./pages/MessageHistory"
import UserAdmin from "./pages/UserAdmin"
import SellerInfo from "./pages/SellerInfo"
import SellHistory from "./pages/SellHistory"
import ProductSell from "./pages/ProductSell"
import Help from "./pages/Help"
import Store from "./pages/Store"
import ModifyStore from "./pages/ModifyStore"
import Hotline from "./pages/Hotline"
import FooterDesk from "./components/FooterDesk"
import StripeContainer from "./stripe/StripeContainer"
import "./App.scss"
import axios from "axios"

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("dark")
  const [cart, setCart] = useState([])
  const [catalog, setCatalog] = useState([])
  const [test, setTest] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [countCart, setCountCart] = useState(0)
  const [userId, setUserId] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("isConnected")
    if (stored) {
      setIsConnected(JSON.parse(stored))
    }
  }, [isConnected])

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites"))
    if (favoritesFromStorage) {
      setFavorites(favoritesFromStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    axios
      .get("http://localhost:4242/catalog", { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        setCatalog(data)
        setTest(true)
      })
  }, [isAdded])

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"))
    if (cartData) {
      setCart(cartData)
      setCountCart(cartData.length)
    }
  }, [])

  const handleAddToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item])
  }

  const handleRemoveFromFavorites = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== item.id)
    )
  }
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0)
    setTotalCart(total)
  }, [cart])

  const addToCart = (card) => {
    const newCart = [...cart, card]
    setCart(newCart)
    setCountCart(newCart.length)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    setCountCart(newCart.length)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const [productId, setProductId] = useState(null)

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Navbar
          countCart={countCart}
          setIsConnected={setIsConnected}
          isConnected={isConnected}
          setUserId={setUserId}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                catalog={catalog}
                test={test}
                removed={removed}
                setRemoved={setRemoved}
                setProductId={setProductId}
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <StripeContainer
                totalCart={totalCart}
                isConnected={isConnected}
                setCart={setCart}
                setCountCart={setCountCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/connexion"
            element={
              <Connexion
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                setUserId={setUserId}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
                catalog={catalog}
                addToCart={addToCart}
                removed={removed}
                setRemoved={setRemoved}
                totalCart={totalCart}
              />
            }
          />
          {/* <Route path="/catalogue" element={<Home />} /> */}
          <Route path="/search" element={<SearchBar />} />
          <Route
            path="/seriesdescription"
            element={
              <SeriesDescription
                removed={removed}
                setRemoved={setRemoved}
                setProductId={setProductId}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/forgotten-password" element={<ForgottenPassword />} />
          <Route
            path="/detailproduit"
            element={
              <DetailProduit
                productId={productId}
                handleAddToFavorites={handleAddToFavorites}
                addToCart={addToCart}
                removed={removed}
                setRemoved={setRemoved}
                setProductId={setProductId}
              />
            }
          />
          <Route
            path="/clientpage"
            element={<UserLambda setIsConnected={setIsConnected} />}
          />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/changeemail" element={<ChangeEmail />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/request" element={<Request />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            }
          />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/messagehistory" element={<MessageHistory />} />
          <Route
            path="/sellerpage"
            element={<UserAdmin setIsConnected={setIsConnected} />}
          />
          <Route
            path="/sellerinfo"
            element={<SellerInfo setIsConnected={setIsConnected} />}
          />
          <Route path="/sellhistory" element={<SellHistory />} />
          <Route
            path="/productsell"
            element={
              <ProductSell
                userId={userId}
                setUserId={setUserId}
                isAdded={isAdded}
                setIsAdded={setIsAdded}
              />
            }
          />
          <Route path="/help" element={<Help />} />
          <Route path="/hotline" element={<Hotline />} />
          <Route path="/mesventes" element={<Store />} />
          <Route path="/ModifyStore" element={<ModifyStore />} />
        </Routes>

        <div className="footerMobile">
          <FooterMobile className="footerMobile" countCart={countCart} />
        </div>
        <div className="footerDesk">
          <FooterDesk />
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
