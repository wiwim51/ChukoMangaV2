import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HiOutlineSearch } from "react-icons/hi"
import axios from "axios"

export default function SearchBar() {
  const [searchText, setSearchText] = useState()
  const navigate = useNavigate()

  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const fetchSuggestions = async (query) => {
    const response = await axios.get("http://localhost:4242/serie")
    const allSeries = response.data
    const filteredSeries = allSeries.filter((serie) =>
      serie.name.toLowerCase().includes(query.toLowerCase())
    )
    setSuggestions(filteredSeries)
  }

  const handleSearch = () => {
    if (selectedSuggestion && selectedSuggestion !== "Aucune suggestion") {
      navigate(`/seriesdescription?search=${selectedSuggestion}`)
    }
  }

  useEffect(() => {
    if (searchText) {
      fetchSuggestions(searchText)
    } else {
      setSuggestions([])
    }
  }, [searchText])
  return (
    <div className="container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Type your search here..."
          name="q"
          value={searchText}
          autoComplete="off"
          onClick={() => setShowDropdown(!showDropdown)}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />

        {showDropdown && (
          <select
            className="suggestions-dropdown"
            size={
              isInputFocused && suggestions.length > 0
                ? suggestions.length + 2
                : 1
            }
            onClick={(() => setShowDropdown(false), handleSearch)}
            value={selectedSuggestion}
            onChange={(e) => setSelectedSuggestion(e.target.value)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            onFocus={() => setIsInputFocused(true)}
          >
            {suggestions.length > 0 && (
              <option
                className="option-settings"
                value=""
                hidden
                style={{ display: "none" }}
              />
            )}
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <option
                  className="option-settings"
                  key={index}
                  value={suggestion.name}
                >
                  {suggestion.name}
                </option>
              ))
            ) : (
              <option
                value="Aucune suggestion"
                className="option-settings-notfound"
              >
                Aucune suggestion trouvée
              </option>
            )}
          </select>
        )}

        <button type="submit">
          <HiOutlineSearch className="searchButton" />
        </button>
      </div>
    </div>
  )
}
