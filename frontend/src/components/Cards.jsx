import { NavLink } from "react-router-dom"

const Cards = ({
  card,
  addToCart,
  removed,
  setRemoved,
  setProductId,
  cart,
}) => {
  const handleAddToCart = () => {
    addToCart(card)
    setRemoved(true)
  }
  const handleProductId = () => {
    setProductId(card.id)
  }

  const isAddedToCart = cart.some((item) => item.id === card.id)

  return (
    <div className="CardComponent" key={card.id}>
      <div className="mobileJSX">
        <div className="Card">
          <NavLink to="DetailProduit" className="detailproduit">
            <img
              className="picture-cards"
              src={card.customImage}
              alt={card.name}
              onClick={handleProductId}
            />
          </NavLink>
          <h3 className="Tome"> Tome {card.number}</h3>
          <p className="Prix"> {card.price} €</p>
          <h2 className="TitreHover">{card.name}</h2>
          <h3 className="TomeHover"> Tome {card.number}</h3>
          <p className="PrixHover">{card.price} €</p>
          {isAddedToCart && removed ? (
            <button className="btn-added-cart" disabled>
              Ajouté
            </button>
          ) : (
            <button className="btn-add-cart" onClick={() => handleAddToCart()}>
              Acheter
            </button>
          )}{" "}
        </div>
      </div>
      <div className="desktopJSX">
        <div className="Card">
          <NavLink to="DetailProduit" className="detailproduit">
            <img
              className="picture-cards"
              src={card.customImage}
              alt={card.name}
              onClick={handleProductId}
            />
          </NavLink>
          <h3 className="Tome"> Tome {card.number}</h3>
          <p className="Prix"> {card.price} €</p>
          <h2 className="TitreHover">{card.name}</h2>
          <h3 className="TomeHover"> Tome {card.number}</h3>
          <p className="PrixHover">{card.price} €</p>
          {isAddedToCart && removed ? (
            <button className="btn-added-cart" disabled>
              Ajouté
            </button>
          ) : (
            <button className="btn-add-cart" onClick={() => handleAddToCart()}>
              Acheter
            </button>
          )}{" "}
        </div>
      </div>
      {/* <div className="desktopJSX">
        <div className="Card">
          <NavLink className="picture-cards-div" to="DetailProduit">
            <img
              className="picture-cards"
              src={card.customImage}
              alt={card.name}
              onClick={handleProductId}
            />
          </NavLink>
          <h1 className="Titre">
            {card.name}
            <p>Tome {card.number}</p>
          </h1>
          <h2 className="Prix">{card.price}€</h2>
          {isAddedToCart && removed ? (
            <button className="btn-added-cart" disabled>
              Ajouté
            </button>
          ) : (
            <button className="btn-add-cart" onClick={() => handleAddToCart()}>
              Acheter
            </button>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default Cards
