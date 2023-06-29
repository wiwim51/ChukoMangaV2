// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { AiOutlineArrowLeft } from "react-icons/ai"
// import axios from "axios"
import UserAdmin from "./UserAdmin"

export default function MessageHistory() {
  // const previousPage = () => {
  //   window.history.back()
  // }

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
    <div className="messageHistory">
      {/* <button className="arrow-left-cart" onClick={previousPage}>
        <AiOutlineArrowLeft className="ArrowLeft" />
      </button> */}
      <h2>Historique des messages</h2>
      <div className="messageSection">
        <UserAdmin />
        <div className="messageList"></div>
      </div>
    </div>
  )
}
