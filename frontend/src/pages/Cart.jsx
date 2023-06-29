import MoreProductCart from "../components/MoreProductCart"
import ProductCart from "../components/ProductCart"
import TotalCart from "../components/TotalCart"
import { AiOutlineArrowLeft } from "react-icons/ai"

const Cart = ({
  cart,
  setCart,
  removeFromCart,
  catalog,
  addToCart,
  removed,
  setRemoved,
  totalCart,
}) => {
  const previousPage = () => {
    window.history.back()
  }

  return (
    <>
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft />
      </button>
      {/* <h1 className="title-page-mobile-cart">Votre Panier</h1> */}
      <div className="cart-container">
        <div className="product-cart">
          <ProductCart cart={cart} removeFromCart={removeFromCart} />
        </div>
        <div className="total-cart">
          <TotalCart totalCart={totalCart} />
        </div>
        <div className="moreproduct-cart">
          <MoreProductCart
            cart={cart}
            setCart={setCart}
            catalog={catalog}
            addToCart={addToCart}
            removed={removed}
            setRemoved={setRemoved}
          />
        </div>
      </div>
    </>
  )
}

export default Cart
