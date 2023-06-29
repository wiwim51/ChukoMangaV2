import { useState } from "react"

const FilterDesktop = ({
  catalog,
  setFilteredCatalog,
  setFilteredEtat,
  setFilteredPrice,
}) => {
  const [activeFilterGenre, setActiveFilterGenre] = useState("Tous")
  const [showDropdownGenre, setShowDropdownGenre] = useState(false)

  const [activeFilterEtat, setActiveFilterEtat] = useState("Tous")
  const [showDropdownEtat, setShowDropdownEtat] = useState(false)

  const [price, setPrice] = useState(100)

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setPrice(value)
    setFilteredPrice(value)
  }

  const handleSelectGenre = (filterGenre) => {
    setActiveFilterGenre(filterGenre)
    setFilteredCatalog(filterGenre)
    setShowDropdownGenre(false)
  }

  const handleSelectEtat = (filterEtat) => {
    setActiveFilterEtat(filterEtat)
    setFilteredEtat(filterEtat)
    setShowDropdownEtat(false)
  }

  const filtersGenre = [
    "Tous",
    ...catalog.reduce((acc, curr) => {
      const genres = curr.genres.split(",")
      genres.forEach((genre) => {
        if (!acc.includes(genre.trim())) {
          acc.push(genre.trim())
        }
      })
      return acc
    }, []),
  ].sort((a, b) => {
    if (a === "Tous") {
      return -1
    } else if (b === "Tous") {
      return 1
    } else {
      return a.localeCompare(b)
    }
  })

  const filtersEtat = [
    "Tous",
    ...catalog.reduce((acc, curr) => {
      const etat = curr.etat.split(",")
      etat.forEach((etat) => {
        if (!acc.includes(etat.trim())) {
          acc.push(etat.trim())
        }
      })
      return acc
    }, []),
  ].sort((a, b) => {
    if (a === "Tous") {
      return -1
    } else if (b === "Tous") {
      return 1
    } else {
      return a.localeCompare(b)
    }
  })

  const handleDropdownGenreToggle = () => {
    setShowDropdownGenre(!showDropdownGenre)
  }

  const handleDropdownEtatToggle = () => {
    setShowDropdownEtat(!showDropdownEtat)
  }

  return (
    <div className="filterDesktop">
      <div className="filterOption-box">
        <div className="filterDesktopTitle">Genres</div>
        <div className="filterDesktopContainer">
          <button className="filterButton" onClick={handleDropdownGenreToggle}>
            <div>{activeFilterGenre}</div> <div>&#x25BE;</div>
          </button>
          {showDropdownGenre && (
            <ul className="filterDropdown">
              {filtersGenre.map((filterGenre) => (
                <li
                  key={filterGenre}
                  className="filterDropdownItem"
                  onClick={() => handleSelectGenre(filterGenre)}
                >
                  {filterGenre}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="filterOption-box">
        <div className="filterDesktopTitle">Etat</div>
        <div className="filterDesktopContainer">
          <button className="filterButton" onClick={handleDropdownEtatToggle}>
            <div>{activeFilterEtat}</div> <div>&#x25BE;</div>
          </button>
          {showDropdownEtat && (
            <ul className="filterDropdown">
              {filtersEtat.map((filterEtat) => (
                <li
                  key={filterEtat}
                  className="filterDropdownItem"
                  onClick={() => handleSelectEtat(filterEtat)}
                >
                  {filterEtat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="filterOption-box">
        <div className="price-input">
          {" "}
          <div className="filterDesktopTitlePrix">Prix</div>
          <div className="price-range-input" style={{ position: "relative" }}>
            <div className="input-wrapper">
              <input
                className="bouton-prix"
                type="number"
                min="0"
                max="100"
                value={price}
                onChange={handlePriceChange}
              />
              <span className="euro-symbol">€</span>
            </div>
          </div>
        </div>

        <div className="filterDesktopContainer">
          <div className="price-range-box">
            <div className="price-range-slider">
              <input
                type="range"
                min="0"
                max="100"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterDesktop
