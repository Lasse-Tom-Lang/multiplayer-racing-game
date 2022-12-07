import { useNavigate } from "react-router"

const Menu = () => {

  const navigate = useNavigate()

  const getRoomID = () => {
    fetch("/createRoom")
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.id}`))
  }

  return (
    <main>
      <h1>
        Menu
      </h1>
      <button onClick={getRoomID}>
        Create room
      </button>
      <input placeholder="Room code"/>
      <button>
        Join room
      </button>
    </main>
  )
}

export default Menu