import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
// import Cards from "../components/Cards"
import axios from "axios"
import { AiOutlineArrowLeft } from "react-icons/ai"
import RequestModal from "../components/RequestModal"
import SerieCards from "@components/SerieCards"

export default function SeriesDescription({
  addToCart,
  removed,
  setRemoved,
  setProductId,
}) {
  const previousPage = () => {
    window.history.back()
  }

  const [searchData, setSearchData] = useState([])
  const [findTome, setFindTome] = useState()
  const [tomeData, setTomeData] = useState([])
  const [findSameGenre, setFindSameGenre] = useState()
  const [genreData, setGenreData] = useState([])
  const [openRequestModal, setOpenRequestModal] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchResult = searchParams.get("search")

  useEffect(() => {
    axios.get(`http://localhost:4242/serie/${searchResult}`).then((res) => {
      setSearchData(res.data)
      setFindTome(res.data.id)
      setFindSameGenre(res.data.id)
      // if (findTome) {
      //   axios.get(`http://localhost:4242/tomeStock/${findTome}`).then((res) => {
      //     setTomeData(res.data)
      //   })
      // }
    })
  }, [location.search])

  useEffect(() => {
    if (findTome) {
      setTomeData([])
      axios.get(`http://localhost:4242/tomeStock/${findTome}`).then((res) => {
        setTomeData(res.data)
      })
    }
  }, [findTome])

  useEffect(() => {
    if (findSameGenre) {
      setGenreData([])
      axios
        .get(`http://localhost:4242/tomeGenre/${findSameGenre}`)
        .then((res) => {
          setGenreData(res.data)
        })
    }
  }, [findSameGenre])

  return (
    <div className="seriesDescription">
      <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button>
      {/* <h2>Recherche correspondant à {searchData.name}</h2> */}
      <div className="series">
        <div className="seriesImg">
          <img
            className="narutoImg"
            src={searchData.image}
            alt="Jaquette du manga"
          />
        </div>
        <div className="seriesInfo">
          <span>{searchData.name}</span>
          <p>Série terminée en {searchData.nb_volumes} tomes</p>
          <p>Disponibilité: {searchData.quantity} annonces</p>
        </div>
        <div className="requestBtn">
          <Link to={"/request"}>
            <button className="mobileButton">Créer une demande</button>
          </Link>
          <p>
            {" "}
            Vous ne trouvez pas un tome spécifique ? <br />
            Utilisez notre bouton de demande pour nous faire savoir ce que vous
            cherchez !
          </p>
          <button
            className="desktopButton"
            onClick={() => {
              setOpenRequestModal(true)
            }}
          >
            +
          </button>
          {openRequestModal && (
            <RequestModal requestCloseModal={setOpenRequestModal} />
          )}
        </div>
        <div className="description">
          <p>Synopsis:</p>
          <br />
          <p>{searchData.description}</p>
        </div>
        {/* sugestion test */}
        <div className="suggestions">
          <span className="otherManga"> Suggestions </span>
          <div className="genreImg">
            {genreData.map((seriecard) => (
              <SerieCards
                seriecard={seriecard}
                key={seriecard.product_id}
                setProductId={setProductId}
                className="genre-style"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="othersAvailable">
        <span className="otherTomes">
          Tomes de {searchData.name} en stock :
        </span>

        <div className="tomeImg">
          {tomeData.map((seriecard) => (
            <SerieCards
              seriecard={seriecard}
              key={seriecard.product_id}
              setProductId={setProductId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
