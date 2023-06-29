import { AiOutlineHeart } from "react-icons/ai"

const RandomProduct = ({ addToCart, card, removed, setRemoved, cart }) => {
  const handleAddToCart = () => {
    addToCart(card)
    setRemoved(true)
    // localStorage.setItem("cart", JSON.stringify(card))
  }

  const isAddedToCart = cart.some((item) => item.id === card.id)

  return (
    <>
      <div className="all-container" key={card.id}>
        <div className="imagecart-container">
          <img
            className="image-product-cart"
            src={card.image}
            alt={card.name}
          />
        </div>
        <div className="title-btn-container">
          <div className="title-price-container">
            <h2>
              {card.name} <br /> Vol : {card.number}
            </h2>
            <p>Prix: {card.price} €</p>
          </div>
          <div className="btn-container">
            {isAddedToCart && removed ? (
              <button className="btn-added-cart" disabled>
                Ajouté
              </button>
            ) : (
              <button
                className="btn-add-cart"
                onClick={() => handleAddToCart()}
              >
                Ajouter aux panier
              </button>
            )}
            <button className="btn-fav-cart">
              <AiOutlineHeart />
            </button>
          </div>
        </div>
        <div className="border-spaceline"></div>
      </div>
    </>
  )
}

export default RandomProduct
