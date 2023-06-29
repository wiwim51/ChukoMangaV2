import { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { HiChevronDown } from "react-icons/hi"
import UserAdmin from "./UserAdmin"

export default function Hotline() {
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
              <p>Comment ajouter un lot d'articles ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates1 && (
            <div className="accordion-item-content">
              Malheureusement, nous n'avons pas encore ajouté d'option
              permettant de vendre des articles en lot. Nous travaillons
              actuellement à une version plus aboutie de notre. Nous vous
              remercions pour votre patience !
            </div>
          )}
          <div className="accordionItem">
            <div
              className="accordion-item-header"
              onClick={toggleAccordionItem2}
            >
              <p>Comment effectuer un remboursement ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates2 && (
            <div className="accordion-item-content">
              Pour emclencher une procédure de remboursement, merci de nous
              contacter.
            </div>
          )}
          <div className="accordionItem">
            <div
              className="accordion-item-header"
              onClick={toggleAccordionItem3}
            >
              <p>Que faire en cas de litige avec un client ?</p>
              <HiChevronDown className="dropdownArrow" />
            </div>
          </div>
          {!accordionStates3 && (
            <div className="accordion-item-content">
              Si vous rencontrez un litige avec un client, merci de nous
              contacter et de nous préciser le numéro de commande concerné afin
              que nous puissions gérer la situation au mieux pour les deux
              partis.
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
