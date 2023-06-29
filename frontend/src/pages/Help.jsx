import { useState } from "react"
// import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { HiChevronDown } from "react-icons/hi"
// import axios from "axios"
import UserAdmin from "./UserAdmin"

export default function Help() {
  const previousPage = () => {
    window.history.back()
  }

  // const [userInfo1, setUserInfo1] = useState([])
  // const [isLoading1, setIsLoading1] = useState(false)
  const [accordionStates1, setAccordionStates1] = useState(true)
  const [accordionStates2, setAccordionStates2] = useState(true)
  const [accordionStates3, setAccordionStates3] = useState(true)

  // const getData = () => {
  //   axios.get("https://randomuser.me/api?nat=en").then((res) => {
  //     setUserInfo1(res.data.results[0])
  //     setIsLoading1(true)
  //   })
  // }

  const toggleAccordionItem1 = () => {
    setAccordionStates1(!accordionStates1)
  }

  const toggleAccordionItem2 = () => {
    setAccordionStates2(!accordionStates2)
  }

  const toggleAccordionItem3 = () => {
    setAccordionStates3(!accordionStates3)
  }

  // useEffect(() => {
  //   getData()

  // }, [])
  // Add event listeners for accordion items

  // Remove event listeners on cleanup
  //   return () => {
  //     accordionRef.current.forEach((accordionRef) => {
  //       accordionRef.removeEventListener("click", () => {
  //         accordionRef.classList.toggle("active")
  //       })
  //     })
  //   }
  // }, [])

  // const toggleAccordionItem = (item) => {
  //   setAccordionStates({ ...accordionStates, [item]: !accordionStates[item] })
  // }

  return (
    <div className="help-container">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      <h2>Besoin d'aide ?</h2>
      <div className="helpSection">
        <div className="faqMobile">
          <h3>Questions les plus fréquemment posées</h3>
          <div className="accordionItem">
            <div
              className="accordion-item-header"
              onClick={toggleAccordionItem1}
            >
              <p>Ma livraison n'est toujours pas arrivée. Que faire ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates1 && (
            <div className="accordion-item-content">
              Les délais de livraison de votre commande sont estimés en fonction
              des jours ouvrés. Les weekends et les jours fériés ne sont donc
              pas compris dans l'estimation de la date de livraison. Si malgré
              cela, les délais son dépassés et votre colis n'est toujours pas
              arrivé, n'hésitez pas à contacter votre vendeur à l'aide du bouton
              "Contacter le vendeur".
            </div>
          )}
          <div className="accordionItem">
            <div
              className="accordion-item-header"
              onClick={toggleAccordionItem2}
            >
              <p>Où trouver mon historique de commande ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates2 && (
            <div className="accordion-item-content">
              Vous pouvez retrouver l'historique de vos commandes sur votre
              tableau de utilisateur, à la rubrique "Historique des commandes".
            </div>
          )}
          <div className="accordionItem">
            <div
              className="accordion-item-header"
              onClick={toggleAccordionItem3}
            >
              <p>Comment demander un remboursement ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates3 && (
            <div className="accordion-item-content">
              Vous pouvez effectuer un réclamation ou demander un remboursement
              via le bouton "Contacter le vendeur" présent dans l'encart vendeur
              de la page détaillant l'article que vous avez acheté dans un délai
              de deux semaines suivant la réception de votre commande.
            </div>
          )}
          <div className="otherQuestions">
            <p>Vous avez encore des questions ?</p>
            <p className="contactUs">Contactez-nous !</p>
            <div className="contactInfo">
              <p>+33 1 35 23 73 89</p>
              <p>abdou@flute.com</p>
            </div>
          </div>
        </div>
        <UserAdmin />
      </div>
    </div>
  )
}
