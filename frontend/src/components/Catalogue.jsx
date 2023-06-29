import { useState, useEffect } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg"
import Cards from "./Cards"

const Catalogue = ({
  filteredCatalog,
  catalog,
  filteredEtat,
  addToCart,
  removed,
  setRemoved,
  setProductId,
  filteredPrice,
  cart,
  setCart,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(14)
  const [items, setItems] = useState(catalog)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const pageCount = Math.max(Math.ceil(items.length / itemsPerPage), 1)

  useEffect(() => {
    if (
      filteredCatalog === "Tous" &&
      filteredEtat === "Tous" &&
      filteredPrice === "Tous"
    ) {
      setItems(catalog)
    } else {
      const filteredItems = catalog.filter((item) => {
        return (
          (filteredCatalog === "Tous" ||
            item.genres.includes(filteredCatalog)) &&
          (filteredEtat === "Tous" || item.etat.includes(filteredEtat)) &&
          (filteredPrice === "Tous" || item.price <= filteredPrice)
        )
      })
      setItems(filteredItems)
      setCurrentPage(1)
    }
  }, [catalog, filteredCatalog, filteredEtat, filteredPrice])

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  const handleClick = (event) => {
    event.preventDefault()
    setCurrentPage(Number(event.target.id))
  }

  const renderPageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  ).map((number) => {
    return (
      <li
        className={currentPage === number ? "numberPageActive" : "numberPage"}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    )
  })

  return (
    <div className="catalogue-container">
      <h1 className="catalogue-title">Nouveautés</h1>
      <div className="catalogue-box">
        <div className="catalogue-box-cards">
          {currentItems.map((card) => (
            <Cards
              card={card}
              key={card.id}
              addToCart={addToCart}
              removed={removed}
              setRemoved={setRemoved}
              setProductId={setProductId}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
        <div className="catalogue-box-pagination">
          {items.length > 0 && (
            <div className="pagination">
              <button
                className="arrow-page"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <CgChevronDoubleLeft />
              </button>
              <button
                className="arrow-page"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <HiChevronLeft />
              </button>
              <ul id="page-numbers">{renderPageNumbers}</ul>
              <button
                className="arrow-page"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                <HiChevronRight />
              </button>
              <button
                className="arrow-page"
                onClick={() => setCurrentPage(pageCount)}
                disabled={currentPage === pageCount}
              >
                <CgChevronDoubleRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalogue
