import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSocketServiceValue } from '../../services'

export const SelectModeRoute = () => {
  const history = useHistory()
  const {
    createRoom,
    onRoomCreated
  } = useSocketServiceValue()

  const handleMultiplayer = async () => {
    await createRoom()
  }

  const handleRoomCreated = (data: any) => {
    history.push(`/multi-player/${data}/1`)
  }

  useEffect(() => {
    onRoomCreated(handleRoomCreated)    
  }, [])

  return (
    <div className="select-mode centered">
      <Link
        to="/single-player"
        className="btn btn-info col-12 p-4 mb-5"
      >
        Single Player
      </Link>
      <button
        className="btn btn-success col-12 p-4 mb-5"
        onClick={handleMultiplayer}
      >
        Multi Player
      </button>
    </div>
  )
}