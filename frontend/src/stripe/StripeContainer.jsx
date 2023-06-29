import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const publicKey = import.meta.env.VITE_PUBLIC_KEY
const stripePromise = loadStripe(publicKey)

const StripeContainer = ({
  totalCart,
  isConnected,
  setCart,
  setCountCart,
  cart,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        totalCart={totalCart}
        isConnected={isConnected}
        setCart={setCart}
        setCountCart={setCountCart}
        cart={cart}
      />
    </Elements>
  )
}

export default StripeContainer
