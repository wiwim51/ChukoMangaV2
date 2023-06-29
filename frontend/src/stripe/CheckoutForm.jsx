import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CheckoutForm = ({
  totalCart,
  isConnected,
  setCart,
  setCountCart,
  cart,
}) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const [showPopup, setShowPopup] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })
    if (!isConnected) {
      alert("Vous devez être connecté pour effectuer un payement !")
      return
    }
    if (!error && isConnected) {
      try {
        const { id } = paymentMethod
        const amountInCents = (totalCart * 100).toFixed(0)
        const response = await axios.post(
          "http://localhost:4242/stripe/payment",
          {
            amount: amountInCents,
            id,
          }
        )
        if (response.data.success) {
          setShowPopup(true)
          localStorage.clear("cart")
          setTimeout(() => {
            setShowPopup(false)
          }, 2000)
          setTimeout(() => {
            navigate("/")
            setCart([])
            setCountCart(0)
          }, 3000)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      setShowPopup2(true)
      setTimeout(() => {
        setShowPopup2(false)
      }, 3000)
    }
  }

  return (
    <div className="page__payment">
      <div className="payment__container">
        <form className="form__payment" onSubmit={handleSubmit}>
          <div className="title__payment">
            <h1>Payez avec Stripe</h1>
            <br />
            <p className="price__payment">
              Prix total de votre commande : {totalCart} €
            </p>
          </div>
          <div className="info__payment">
            {cart.map((item) => (
              <div key={item.id} className="all-container">
                <div className="imagecart-container">
                  <img
                    className="image-product-cart"
                    src={item.image}
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
                </div>
                <div className="border-spaceline"></div>
              </div>
            ))}
          </div>
          <div className="card__payment">
            <p className="check__payment">
              Veuillez rentrer vos informations de paiement
            </p>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    iconColor: "#8080C0",
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button className="btn__payment" type="submit">
            Payer
          </button>
        </form>
      </div>
      {showPopup && <div className="popup__payment">Payement Réussi !</div>}
      {showPopup2 && (
        <div className="popup__payment">Le payement à échoué !</div>
      )}
    </div>
  )
}

export default CheckoutForm
