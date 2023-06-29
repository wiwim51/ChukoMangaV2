/* eslint-disable no-lone-blocks */
// import imageNaruto from "../assets/images/narutodetail.png"
import Seller from "../components/Seller"
import SerieCards from "../components/SerieCards"

import { HiOutlineHeart, HiHeart } from "react-icons/hi"
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from "axios"
import { useEffect, useState } from "react"

const DetailProduit = ({
  productId,
  addToCart,
  removed,
  setRemoved,
  setProductId,
  handleAddToFavorites,
}) => {
  const previousPage = () => {
    window.history.back()
  }

  const [productData, setProductData] = useState([])
  const [favorite, setFavorite] = useState(false)
  const [AddPanier, setAddPanier] = useState(false)
  const [tomeData, setTomeData] = useState([])
  // const [isNew, setIsNew] = useState([])

  const handleClickFavorite = () => {
    setFavorite(!favorite)
  }

  const handleAddToCart = () => {
    addToCart(productData)
    setAddPanier(true)
    setRemoved(true)
  }
  // useEffect(() => {
  //   if (productData) {
  //     setTomeData([])
  //     axios
  //       .get(`http://localhost:4242/tomeStock/${productData.serie_id}`)
  //       .then((res) => {
  //         setTomeData(res.data)
  //       })
  //   }
  // }, [productData])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/detailproduit/${productId}`)
      .then(async (res) => {
        setProductData(res.data)

        const result = await axios.get(
          `http://localhost:4242/tomeStock/${res.data.serie_id}`
        )
        setTomeData(result.data)
        // .then((res) => {
        //   setTomeData(res.data)
        // })
      })
  }, [productId])

  return (
    <>
      <div className="bodyDetailProduit">
        <div className="icons">
          <button className="arrow-left-cart" onClick={previousPage}>
            <AiOutlineArrowLeft className="ArrowLeft" />
          </button>
          <div className="Logo">
            <button onClick={handleClickFavorite}>
              {favorite ? (
                <HiHeart className="OutlineHeartIcon" />
              ) : (
                <HiOutlineHeart className="fullHeartIcon" />
              )}
            </button>
          </div>
        </div>
        <div className="desktopbaby">
          <div className="annonce">
            <div className="container_one">
              <img
                className="imageNaruto"
                src={productData.customImage}
                alt="Tome de Naruto"
              />
            </div>
            <div className="container_two">
              <div className="detail_card">
                <div className="dot_container">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="description_produit">
                  <h2 className="title_produit">
                    {productData.name} - tome {productData.tome_id} -{" "}
                    {productData.price} €
                  </h2>
                  <p className="details_produit">Etat : {productData.etat}</p>
                </div>
                {AddPanier && removed ? (
                  <button className="button-added" disabled>
                    Ajouté
                  </button>
                ) : (
                  <button className="button" onClick={() => handleAddToCart()}>
                    Acheter
                  </button>
                )}
              </div>
              <div className="vendeur">
                <Seller productData={productData} />
              </div>
            </div>
          </div>
          {/* <div className="tomeImg">
            {tomeData.map((seriecard) => (
              <SerieCards
                seriecard={seriecard}
                key={seriecard.product_id}
                setProductId={setProductId}
              />
            ))}
          </div> */}
          <div className="othersAvailable">
            <span className="otherTomes">
              Tomes de {productData.name} en stock :
            </span>

            <div className="tomeImg">
              {tomeData.map((seriecard) => (
                <SerieCards
                  // setIsNew={setIsNew}
                  seriecard={seriecard}
                  key={seriecard.product_id}
                  setProductId={setProductId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduit

// return (
//   <>
//     <div className="bodyDetailProduit">
//       <div className="icons">
//         <button className="arrow-left-cart" onClick={previousPage}>
//           <AiOutlineArrowLeft className="ArrowLeft" />
//         </button>
//         <div className="Logo">
//           <button onClick={handleClickFavorite}>
//             {favorite ? (
//               <HiHeart className="OutlineHeartIcon" />
//             ) : (
//               <HiOutlineHeart className="fullHeartIcon" />
//             )}
//           </button>
//         </div>
//       </div>
//       <div className="desktopbaby">
//         <div className="annonce">
//           <div className="container_one">
//             <img
//               className="imageNaruto"
//               src={productData.customImage}
//               alt="Tome de Naruto"
//             />
//           </div>
//           <div className="container_two">
//             <div className="detail_card">
//               <div className="dot_container">
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//                 <span className="dot"></span>
//               </div>
//               <div className="description_produit">
//                 <h2 className="title_produit">
//                   {productData.name} - tome {productData.tome_id} -{" "}
//                   {productData.price} €
//                 </h2>
//                 <p className="details_produit">Etat : {productData.etat}</p>
//               </div>
//               {AddPanier && removed ? (
//                 <button className="button-added" disabled>
//                   Ajouté
//                 </button>
//               ) : (
//                 <button className="button" onClick={() => handleAddToCart()}>
//                   Acheter
//                 </button>
//               )}
//             </div>
//             <div className="vendeur">
//               <Seller productData={productData} />
//             </div>
//           </div>
//         </div>
//         <div className="autretomes">
//           <h1>Autres tomes de {productData.name} disponibles</h1>
//           <div className="parent">
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//             <div className="AnnonceAutre">
//               <div className="Annonce_Image">
//                 <div className="Detail_Card">
//                   <img
//                     className="imageNaruto"
//                     src={imageNaruto}
//                     alt="Tome de Naruto"
//                   />

//                   <h2 className="Description_Produit">
//                     Naruto - Tome 1 à 15 - 45e
//                   </h2>
//                 </div>
//               </div>
//               <button className="button" onClick="maFonction()">
//                 Ajouter au panier
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="autremanga">
//         <h1>Autres mangas - Shonen</h1>
//         <div className="parent">
//           <div className="AnnonceAutre">
//             <div className="Annonce_Image">
//               <div className="Detail_Card">
//                 <img
//                   className="imageNaruto"
//                   src="https://m.media-amazon.com/images/I/517G4sTzXdL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
//                   alt="Tome de Naruto"
//                 />
//                 <div className="dot_container">
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                 </div>
//                 <h2 className="Description_Produit">
//                   Naruto - Tome 1 à 15 - 45e
//                 </h2>
//               </div>
//             </div>
//             <button className="button" onClick="maFonction()">
//               Ajouter au panier
//             </button>
//           </div>
//           <div className="AnnonceAutre">
//             <div className="Annonce_Image">
//               <div className="Detail_Card">
//                 <img
//                   className="imageNaruto"
//                   src="https://m.media-amazon.com/images/I/41110KFb2XL._SY291_BO1,204,203,200_QL40_ML2_.jpg"
//                   alt="Tome de Naruto"
//                 />
//                 <div className="dot_container">
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                 </div>
//                 <h2 className="Description_Produit">
//                   Naruto - Tome 1 à 15 - 45e
//                 </h2>
//               </div>
//             </div>
//             <button className="button" onClick="maFonction()">
//               Ajouter au panier
//             </button>
//           </div>
//           <div className="AnnonceAutre">
//             <div className="Annonce_Image">
//               <div className="Detail_Card">
//                 <img
//                   className="imageNaruto"
//                   src="https://m.media-amazon.com/images/I/5131GcTh02L._SY291_BO1,204,203,200_QL40_ML2_.jpg"
//                   alt="Tome de Naruto"
//                 />
//                 <div className="dot_container">
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                 </div>
//                 <h2 className="Description_Produit">
//                   Naruto - Tome 1 à 15 - 45e
//                 </h2>
//               </div>
//             </div>
//             <button className="button" onClick="maFonction()">
//               Ajouter au panier
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// )
