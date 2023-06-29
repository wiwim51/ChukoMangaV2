import React, { useState, useEffect } from "react"
import axios from "axios"

import { MdMail } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import { BiCheckShield } from "react-icons/bi"

const Seller = ({ productData }) => {
  const [userInfo1, setUserInfo1] = useState([])
  const [isLoading1, setIsLoading1] = useState(false)

  const getData = () => {
    axios
      .get("https://randomuser.me/api?nat=en")
      .then(
        (res) => console.info(userInfo1) || setUserInfo1(res.data.results[0])
      )
      .then((res) => setIsLoading1(true))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="seller">
      <div className="picandtitle">
        <div className="picture_seller">
          <img
            src={isLoading1 ? productData.avatar : null}
            alt={productData.firstname}
          />
        </div>
        <div className="title_seller">
          <p>Vendu par</p>
          <h2>
            {productData.firstname} {productData.lastname}
          </h2>
        </div>
      </div>

      <div className="informations_seller">
        <ul>
          <li>
            <MdMail className="logo_seller" />
            Contacter ce vendeur
          </li>
          <li>
            <AiFillStar className="logo_seller" />
            {productData.rating}/5
          </li>
          <li>
            <BiCheckShield className="logo_seller" />
            Vendeur vérifié
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Seller
