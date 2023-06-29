import { NavLink } from "react-router-dom"

const SerieCards = ({ seriecard, setProductId, className }) => {
  const handleProductId = () => {
    setProductId(seriecard.product_id)
  }
  return (
    <div className={`SerieCardComponent ${className}`} key={seriecard.id}>
      {/* <div className="SerieJSX"> */}
      <div className="SerieCard">
        <NavLink to="/DetailProduit" className="detailproduit">
          <img
            className="Seriepicture-cards"
            src={seriecard.customImage}
            alt={seriecard.name}
            onClick={handleProductId}
          />
        </NavLink>
        <h3 className="SerieTome"> Tome {seriecard.number}</h3>
        <p className="SeriePrix"> {seriecard.price} €</p>
      </div>
      {/* </div> */}
    </div>
  )
}

export default SerieCards
