import RandomProduct from "./RandomProduct"

const MoreProductCart = ({
  catalog,
  addToCart,
  removed,
  setRemoved,
  cart,
  setCart,
}) => {
  const selectedIndexes = []
  while (selectedIndexes.length < 5) {
    const randomIndex = Math.floor(Math.random() * catalog.length)
    // si le produit est déjà dans le panier, on le retire de la liste des produits suggérés
    if (
      !selectedIndexes.includes(randomIndex) &&
      !cart.includes(catalog[randomIndex])
    ) {
      selectedIndexes.push(randomIndex)
    }
  }

  const selectedItems = selectedIndexes.map((index) => catalog[index])

  return (
    <>
      <div className="moreproduct-container">
        <h3>Découvrez plus d'articles :</h3>
        {selectedItems.map((card) => (
          <RandomProduct
            key={card.id}
            card={card}
            addToCart={addToCart}
            removed={removed}
            setRemoved={setRemoved}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </>
  )
}

export default MoreProductCart
