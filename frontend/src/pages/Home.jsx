import Catalogue from "../components/Catalogue"
import Topventes from "@components/Topventes"
import FilterMobile from "@components/FilterMobile"
import FilterDesktop from "@components/FilterDesktop"
import { useState } from "react"

export default function Home({
  addToCart,
  catalog,
  test,
  removed,
  setRemoved,
  setProductId,
  cart,
  setCart,
}) {
  const [filteredCatalog, setFilteredCatalog] = useState("Tous")
  const [filteredEtat, setFilteredEtat] = useState("Tous")
  const [filteredPrice, setFilteredPrice] = useState("Tous")
  return (
    <div className="homePage">
      <Topventes className="topventes" />
      <div className="filterMobile-container">
        <FilterMobile
          catalog={catalog}
          setFilteredCatalog={setFilteredCatalog}
        />
      </div>
      <div className="filterAndCatalog">
        <div className="filterDesktop-container">
          <FilterDesktop
            catalog={catalog}
            setFilteredCatalog={setFilteredCatalog}
            setFilteredEtat={setFilteredEtat}
            setFilteredPrice={setFilteredPrice}
          />
        </div>
        <div className="catalog-container">
          {test ? (
            <Catalogue
              catalog={catalog}
              filteredCatalog={filteredCatalog}
              filteredEtat={filteredEtat}
              filteredPrice={filteredPrice}
              addToCart={addToCart}
              removed={removed}
              setRemoved={setRemoved}
              setProductId={setProductId}
              cart={cart}
              setCart={setCart}
            />
          ) : (
            <div>'loading'</div>
          )}
        </div>
      </div>
    </div>
  )
}
