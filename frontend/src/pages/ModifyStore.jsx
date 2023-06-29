import UserAdmin from "../pages/UserAdmin"
// import imageNaruto from "../assets/images/narutodetail.png"
// import { IoFilterOutline } from "react-icons/io"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useParams, Navigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"

const Store = (props) => {
  console.info("les props", props)
  const previousPage = () => {
    window.history.back()
  }

  const [userId, setUserId] = useState(null)
  const [userProducts, setUserProducts] = useState([])
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(Number(storedUserId))
    }
  }, [])

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4242/productUser/${userId}`).then((res) => {
        setUserProducts(res.data)
      })
    }
  }, [userId])

  const handelChange = (value, name) => {
    setData({ ...data, [name]: value })
  }

  const handelSub = () => {
    console.info("pouuuuurrzerazeaze")
    axios
      .put(`http://localhost:5000/phonesmodi/${id}`, data)
      .then(
        (res) =>
          props.setPouletRefresh(!props.pouletRefresh) || Navigate("/Store")
      )
  }

  return (
    <div className="modify_store_page">
      <button className="modify_arrow_left_cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="modify_ArrowLeft" />
      </button>
      <div className="modify_store_overview">
        <UserAdmin className="modify_store_informaions" />
        <div className="modify_store_board">
          <div className="modify_store_table">
            <div className="modify_store_table_title">
              <h2>Ventes en cours</h2>
              <button> Filter</button>
            </div>
            <table className="modify_table">
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
                  <tr key={product.id} className="modify_lineProduct">
                    <td>
                      <input
                        type="text"
                        value={product.id}
                        name="product_id"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={product.name}
                        name="product_name"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={product.number}
                        name="product_name"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={product.etat}
                        name="product_etat"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={product.price}
                        name="product_price"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={product.image}
                        name="product_image"
                        onChange={(e) =>
                          handelChange(e.target.value, e.target.name)
                        }
                      />
                      {/* <img
                        src={
                          product.customImage
                            ? product.customImage
                            : product.image
                        }
                        alt="Couverture du produit"
                        className="modify_imageProduct"
                    /> */}
                    </td>
                    <td>{product.creation_date}</td>
                    <td>
                      <button className="modify_btn_modify" onClick={handelSub}>
                        Modifier
                      </button>
                    </td>
                    <td>
                      <button className="modify_btn_delete">Supprimer</button>
                      {/* button delete à display none si on est sur la page modify et inversement ? */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
