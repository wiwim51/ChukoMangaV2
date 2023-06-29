import { HiOutlineHeart } from "react-icons/hi"
import chopper from "../assets/images/chopper.png"
const ProductCart = ({ cart, removeFromCart }) => {
  return (
    <>
      <div className="productcart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h1>Votre panier est vide.</h1>
            <img className="image-empty-cart" src={chopper} alt={chopper} />
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="all-container">
              <div className="imagecart-container">
                <img
                  className="image-product-cart"
                  src={item.customImage}
                  alt={item.name}
                />
              </div>
              <div className="title-cadeau-btn-container">
                <div className="title-price-container">
                  <h2>
                    {item.name} <br /> Vol: {item.number}
                  </h2>
                  <p>Prix: {item.price} €</p>
                </div>
                <label htmlFor="checkCadeau" className="label-product-cart">
                  <input type="checkbox" id="checkCadeau" />
                  ceci est un cadeau
                </label>
                <div className="btn-container">
                  <button
                    className="btn-delete-cart"
                    onClick={() => removeFromCart(item)}
                  >
                    Supprimer
                  </button>
                  <button className="btn-fav-cart">
                    <HiOutlineHeart />
                  </button>
                </div>
              </div>
              <div className="border-spaceline"></div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default ProductCart
