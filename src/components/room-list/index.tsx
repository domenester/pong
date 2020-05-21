import React, { useEffect, useState } from "react"
import { useSocketServiceValue, ISocketService } from "../../services"
import { Link, useHistory } from "react-router-dom"

export default function RoomList() {
  const {
    getRooms,
    onGetRooms,
    createRoom,
    onRoomCreated
  }: ISocketService = useSocketServiceValue()

  const [ roomsId, setRoomsId ] = useState([])

  const history = useHistory()

  const buildRoomList = () => {
    return roomsId.map( (id: string, index: number) => 
      <div className="col-4 p-1 mb-5">
        <Link
          key={id}
          to={`/multi-player/${id}/2`}
          className="btn btn-info p-4 w-100"
        >
          { `Sala ${index + 1}` }
        </Link>
      </div>
    )
  }

  const handleRoomCreated = (data: any) => {
    history.push(`/multi-player/${data}/1`)
  }

  useEffect(() => {
    getRooms()
    onGetRooms((data) => {
      console.log('data: ', data)
      setRoomsId(data)
    })
    onRoomCreated(handleRoomCreated)
  }, [])

  return (
    <div>
      <div className="row">
        <h1 className="mx-auto"> Rooms </h1>
      </div>
      <div className="row">
        <button
          className="btn btn-success col-4 offset-4 p-4 mb-5"
          onClick={createRoom}
        >
          Create Room
        </button>
      </div>
      <div className="row">
        { buildRoomList() }
      </div>
    </div>
  )
}