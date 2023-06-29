import { useState } from "react"

const FilterMobile = ({ catalog, setFilteredCatalog }) => {
  const [activeFilter, setActiveFilter] = useState("Tous")

  const handleClick = (filter) => {
    setActiveFilter(filter)
    setFilteredCatalog(filter)
  }

  const filters = [
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

  return (
    <div className="filterMobile">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filterButton ${filter === activeFilter ? "active" : ""}`}
          onClick={() => handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterMobile
