const TotalCart = ({ totalCart }) => {
  const handlePay = () => {
    if (totalCart === 0) {
      alert("Votre panier est vide")
    } else {
      window.location.href = "/payment"
    }
  }
  return (
    <>
      <div className="totalcart-container">
        <h2 className="subtitle-total">
          Sous-Total (nb d'articles): {totalCart.toFixed(2)} €
        </h2>
        <div className="border-spaceline"></div>
        <label htmlFor="checkVente" className="label-condition-vente">
          <input type="checkbox" id="checkVente" />
          J'accepte les conditions de vente
        </label>
        <button className="btn-commander" type="submit" onClick={handlePay}>
          Passer la Commande
        </button>
      </div>
    </>
  )
}

export default TotalCart
