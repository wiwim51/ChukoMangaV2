import UserAdmin from "../pages/UserAdmin"
// import imageNaruto from "../assets/images/narutodetail.png"
// import { IoFilterOutline } from "react-icons/io"
import {
  HiOutlineShoppingBag,
  HiOutlineUserAdd,
  HiOutlineCreditCard,
} from "react-icons/hi"
import { BsFilter } from "react-icons/bs"
// import { AiOutlineArrowLeft } from "react-icons/ai"
import React, { useState, useEffect } from "react"

import axios from "axios"

const Store = () => {
  // const previousPage = () => {
  //   window.history.back()
  // }
  const [userId, setUserId] = useState(null)
  const [userProducts, setUserProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [productToModify, setProductToModify] = useState(null)
  const [serieData, setSerieData] = useState([])
  const [tomeData, setTomeData] = useState([])

  const fetchSerieData = async () => {
    try {
      const response = await axios.get("http://localhost:4242/serie")
      setSerieData(response.data)
    } catch (error) {
      console.error("Error fetching series data:", error)
    }
  }

  const fetchTomeData = async (serieId) => {
    try {
      const response = await axios.get(
        `http://localhost:4242/formtome/${serieId}`
      )
      setTomeData(response.data)
    } catch (error) {
      console.error("Error fetching tome data:", error)
    }
  }

  useEffect(() => {
    fetchSerieData()
  }, [])

  const [formData, setFormData] = useState({
    serie_name_id: "",
    serie_name_value: "",
    serie_volume_id: "",
    serie_volume_value: "",
    product_etat: "",
    product_prix: "",
    product_image: null,
  })

  const handleDeleteButtonClick = (product) => {
    setProductToDelete(product)
    setShowModal(true)
  }

  const handleModifyButtonClick = (product) => {
    setProductToModify(product)
    setFormData({
      serie_name_id: product.serie_id,
      serie_name_value: product.name,
      serie_volume_id: product.tome_id,
      serie_volume_value: product.number,
      product_etat: product.etat,
      product_prix: product.price,
      product_image: product.customImage ? product.customImage : product.image,
    })
    setShowModifyModal(true)
    fetchTomeData(product.serie_id)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name.startsWith("serie_")) {
      const id = value
      const newValue = event.target.options[event.target.selectedIndex].text

      if (name === "serie_name") {
        fetchTomeData(id)
      }

      setFormData((prevState) => ({
        ...prevState,
        [`${name}_id`]: id,
        [`${name}_value`]: newValue,
      }))
    } else if (name === "product_image") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: event.target.files[0],
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const fetchUserProducts = async () => {
    if (userId) {
      axios.get(`http://localhost:4242/productUser/${userId}`).then((res) => {
        setUserProducts(res.data)
      })
    }
  }

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:4242/product/${productToDelete.id}`)
      .then(() => {
        console.info("Product deleted")
        fetchUserProducts()
      })
      .catch((error) => {
        console.error("Error deleting product:", error)
      })
    setShowModal(false)
  }

  const handleConfirmModify = () => {
    const updateData = {
      tome_id: formData.serie_volume_id,
      etat: formData.product_etat,
      price: formData.product_prix,
      id: productToModify.id,
    }

    axios
      .put(`http://localhost:4242/product/${productToModify.id}`, updateData)
      .then(() => {
        console.info("Product modified")
        fetchUserProducts()
      })
      .catch((error) => {
        console.error("Error modifying product:", error)
      })
    if (formData.product_image) {
      const imageData = new FormData()
      imageData.append("product_image", formData.product_image)

      axios
        .put(
          `http://localhost:4242/product_image/image/${productToModify.id}`,
          imageData
        )
        .then(() => {
          console.info("Product image updated")
          fetchUserProducts()
        })
        .catch((error) => {
          console.error("Error updating product image:", error)
        })
    }

    setShowModifyModal(false)
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(Number(storedUserId))
    }
  }, [])

  useEffect(() => {
    fetchUserProducts()
  }, [userId])

  return (
    <div className="store_page">
      {/* <button className="arrow_left_cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button> */}
      <div className="store_overview">
        <UserAdmin className="store_informations" />
        <div className="store_board">
          <div className="sellsStatistics">
            <div className="totalSales">
              <div className="totalSales_title">
                <HiOutlineShoppingBag className="icon" />
                <h3>Total des ventes</h3>
              </div>
              <p>379.55€</p>
            </div>
            <div className="visitors">
              <div className="visitors_title">
                {" "}
                <HiOutlineUserAdd className="icon" />
                <h3>Visiteurs</h3>
              </div>
              <p>433</p>
            </div>
            <div className="totalOrders">
              <div className="totalOrders_title">
                <HiOutlineCreditCard className="icon" />
                <h3>Total des commandes</h3>
              </div>
              <p>25</p>
            </div>
          </div>
          <div className="store_table">
            <div className="store_table_title">
              <h2>Ventes en cours</h2>
              <div className="title_filter">
                <BsFilter className="title_filter_icone" />
                <h3>Filtrer</h3>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Id produit</th>
                  <th>Série</th>
                  <th>N° Tome</th>
                  <th>Etat</th>
                  <th>Prix</th>
                  <th>Image Produit</th>
                  <th>Date de mise en ligne</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {userProducts.map((product) => (
                  <tr key={product.id} className="lineProduct">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.number}</td>
                    <td>{product.etat}</td>
                    <td>{product.price}€</td>
                    <td>
                      <img
                        src={
                          product.customImage
                            ? product.customImage
                            : product.image
                        }
                        alt="Couverture du produit"
                        className="imageProduct"
                      />
                    </td>
                    <td>{product.creation_date.split("T")[0]}</td>
                    <td>
                      <button
                        className="btn_modify"
                        onClick={() => handleModifyButtonClick(product)}
                      >
                        Modifier
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn_delete"
                        onClick={() => handleDeleteButtonClick(product)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {console.info(formData)}
      {showModifyModal && (
        <div className="modalModify">
          <div className="modalModify-content">
            <h2>Modifications</h2>
            <form
              className="infoForm"
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault()
                handleConfirmModify()
              }}
            >
              <label htmlFor="serie_name">
                Série
                <select
                  name="serie_name"
                  id="serie_name"
                  value={formData.serie_name_value}
                  onChange={handleChange}
                  required
                >
                  <option value={formData.serie_name_id}>
                    {formData.serie_name_value}
                  </option>
                  {serieData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="serie_volume">
                Tome
                <select
                  name="serie_volume"
                  id="serie_volume"
                  value={formData.serie_volume_value}
                  onChange={handleChange}
                  required
                >
                  <option value={formData.serie_volume_id}>
                    {formData.serie_volume_value}
                  </option>
                  {tomeData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.number}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="product_etat">
                État
                <select
                  name="product_etat"
                  id="product_etat"
                  value={formData.product_etat}
                  onChange={(event) => handleChange(event)}
                  required
                >
                  <option value={formData.product_etat}>
                    {formData.product_etat}
                  </option>
                  <option value="Neuf">Neuf</option>
                  <option value="Très bon">Très bon</option>
                  <option value="Bon">Bon</option>
                  <option value="Satisfaisant">Satisfaisant</option>
                </select>
              </label>
              <label htmlFor="prix_container">
                Prix
                <input
                  name="product_prix"
                  placeholder="Prix en €"
                  type="number"
                  value={formData.product_prix}
                  onChange={(event) => handleChange(event)}
                />
              </label>
              <label htmlFor="product_image" className="labelImage">
                Image
                <input
                  name="product_image"
                  type="file"
                  id="imageUpload"
                  style={{ display: "block" }}
                  onChange={(event) => handleChange(event)}
                />
              </label>
              <div className="submitBtn">
                <button className="submitButton" type="submit">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modalDelete">
          <div className="modal-content">
            <p className="modal-question">
              Êtes-vous sûr de vouloir supprimer le produit{" "}
              {productToDelete.name} volume {productToDelete.number} ayant l'ID{" "}
              {productToDelete.id} ?
            </p>
            <div className="button-container">
              <button
                className="button-modale-delete"
                onClick={handleConfirmDelete}
              >
                Oui
              </button>
              <button
                className="button-modale-delete"
                onClick={handleModalClose}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Store
