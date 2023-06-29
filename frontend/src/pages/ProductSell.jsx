// import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import UserAdmin from "./UserAdmin"

export default function ProductSell({ userId, setUserId }) {
  const initialFormDataSerie = {
    serie_name: "",
  }
  const initialFormDataTome = {
    serie_volume: "",
  }
  const initialFormDataProduct = {
    product_etat: "",
    product_prix: "",
  }

  const [formDataSerie, setFormDataSerie] = useState(initialFormDataSerie)
  const [formDataTome, setFormDataTome] = useState(initialFormDataTome)
  const [formDataUser, setFormDataUser] = useState({ userId: null })
  const [formDataProduct, setFormDataProduct] = useState(initialFormDataProduct)
  console.info("la state form data user", formDataUser)

  const resetForm = () => {
    setFormDataSerie(initialFormDataSerie)
    setFormDataTome(initialFormDataTome)
    setFormDataProduct(initialFormDataProduct)
  }

  const [serieData, setSerieData] = useState([])
  const [serieVolumeData, setSerieVolumeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const userIdStorage = localStorage.getItem("userId")
    if (userIdStorage) {
      setUserId(userIdStorage)
    }
  }, [userId])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4242/serie`)
        setSerieData(response.data)
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/user/${userId}`, { withCredentials: true })
      .then(() => {
        setFormDataUser((prevState) => ({ ...prevState, userId }))
      })
  }, [userId])
  console.info("formDataUser", userId)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:4242/product", {
        ...formDataSerie,
        ...formDataTome,
        ...formDataUser,
        ...formDataProduct,
      })
      console.info("res front", res)
      const formData = new FormData()
      formData.append("product_image", inputRef.current.files[0])
      await axios.post(
        `http://localhost:4242/product_image/image/${res.data.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error)
    }
    setLoading(false)
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 5000)
    resetForm()
    setSerieVolumeData([])
  }

  useEffect(() => {
    if (formDataSerie !== null) {
      axios
        .get(`http://localhost:4242/formtome/${formDataSerie.serie_name}`)
        .then((res) => {
          setSerieVolumeData(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [formDataSerie, setSerieVolumeData])

  const previousPage = () => {
    window.history.back()
  }

  const SerieChange = (e) => {
    const { name, value } = e.target
    setFormDataSerie((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleChangeTome = (e) => {
    const { name, value } = e.target
    setFormDataTome((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleChangeEtat = (e) => {
    const { name, value } = e.target
    setFormDataProduct((prevData) => ({ ...prevData, [name]: value }))
  }

  const handlePrice = (e) => {
    const { value } = e.target
    setFormDataProduct((prevData) => ({ ...prevData, product_prix: value }))
  }

  const inputRef = useRef(null)

  console.info({
    ...formDataSerie,
    ...formDataTome,
    ...formDataUser,
    ...formDataProduct,
  })
  // const [userInfo1, setUserInfo1] = useState([])
  // const [isLoading1, setIsLoading1] = useState(false)

  // const getData = () => {
  //   axios
  //     .get("https://randomuser.me/api?nat=en")
  //     .then((res) => setUserInfo1(res.data.results[0]))
  //     .then((res) => setIsLoading1(true))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <>
      <div className="mobileJSX">
        <div className="productSell">
          <button className="arrow-left-cart" onClick={previousPage}>
            <AiOutlineArrowLeft className="ArrowLeft" />
          </button>
          <h2>Mettre en vente</h2>
          <form
            className="infoForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <label htmlFor="serie_name">
              <select
                name="serie_name"
                id="serie_name"
                value={formDataSerie.serie_name}
                onChange={SerieChange}
                required
              >
                <option value="">Sélectionner le nom du manga</option>
                {serieData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="serie_volume">
              <select
                name="serie_volume"
                id="serie_volume"
                value={serieVolumeData.serie_nb_volumes}
                onChange={handleChangeTome}
                required
              >
                <option value="">Sélectionner le volume concerné</option>
                {serieVolumeData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.number}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="product_etat">
              <select
                name="product_etat"
                id="product_etat"
                value={formDataProduct.product_etat}
                onChange={handleChangeEtat}
                required
              >
                <option value="">Sélectionner l'état du manga</option>
                <option value="Neuf">Neuf</option>
                <option value="Très bon">Très bon</option>
                <option value="Bon">Bon</option>
                <option value="Satisfaisant">Satisfaisant</option>
              </select>
            </label>
            <label htmlFor="prix_container">
              <input
                name="product_prix"
                placeholder="Prix en €"
                type="number"
                value={formDataProduct.product_prix}
                onChange={handlePrice}
              />
            </label>
            <label htmlFor="product_image" className="labelImage">
              <input
                name="product_image"
                type="file"
                id="imageUpload"
                ref={inputRef}
                style={{ display: "block" }}
              />
            </label>
            <div className="submitBtn">
              <button className="submitButton" type="submit">
                {" "}
                {loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
          {showPopup && (
            <div className="popup">Produit ajouté à l'annonce !</div>
          )}
        </div>
      </div>
      <div className="desktopJSX">
        <div className="productSell">
          <button className="arrow-left-cart" onClick={previousPage}>
            <AiOutlineArrowLeft className="ArrowLeft" />
          </button>
          <h2 className="titreDesktop">Mettre en vente</h2>
          <UserAdmin />
          <div className="sellingSection">
            <div className="head">
              <p>Mise en vente</p>
              <form
                className="infoForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <label htmlFor="serie_name" className="labelOthers">
                  <select
                    className="select_selector"
                    name="serie_name"
                    id="serie_name"
                    value={formDataSerie.serie_name}
                    onChange={SerieChange}
                    required
                  >
                    <option value="">Sélectionner le nom du manga</option>
                    {serieData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="serie_volume" className="labelOthers">
                  <select
                    className="select_selector"
                    name="serie_volume"
                    id="serie_volume"
                    value={serieVolumeData.serie_nb_volumes}
                    onChange={handleChangeTome}
                    required
                  >
                    <option value="">Sélectionner le volume concerné</option>
                    {serieVolumeData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.number}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="product_etat" className="labelOthers">
                  <select
                    className="select_selector"
                    name="product_etat"
                    id="product_etat"
                    value={formDataProduct.product_etat}
                    onChange={handleChangeEtat}
                    required
                  >
                    <option value="">Sélectionner l'état du manga</option>
                    <option value="Neuf">Neuf</option>
                    <option value="Très bon">Très bon</option>
                    <option value="Bon">Bon</option>
                    <option value="Satisfaisant">Satisfaisant</option>
                  </select>
                </label>
                <label htmlFor="prix_container" className="labelOthers">
                  <input
                    className="inputOthers"
                    name="product_prix"
                    placeholder="Sélectionner le prix en €"
                    type="number"
                    value={formDataProduct.product_prix}
                    onChange={handlePrice}
                  />
                </label>
                <label htmlFor="product_image" className="labelImage">
                  <div className="divInput">
                    <input
                      className="inputImage"
                      name="product_image"
                      type="file"
                      id="imageUpload"
                      ref={inputRef}
                      style={{ display: "block" }}
                    />
                  </div>
                </label>
                <div className="submitBtn">
                  <button className="submitBtn" type="submit">
                    {loading ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </div>
              </form>
              {showPopup && (
                <div className="popup">Produit ajouté à l'annonce !</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const handleImageChange = (e) => {
//   const file = e.target.files[0]

//   setSelectedImage(URL.createObjectURL(file))

//   const reader = new FileReader()
//   reader.readAsDataURL(file)

//   reader.onloadend = () => {
//     setFormDataProductImage(reader.result)
//   }
// }
