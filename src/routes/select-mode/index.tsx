import React from 'react';
import { Link } from 'react-router-dom';

export const SelectModeRoute = () => {
  return (
    <div className="select-mode centered">
      <Link
        to="/single-player"
        className="btn btn-info col-12 p-4 mb-5"
      >
        Single Player
      </Link>
      <Link
        to="/rooms"
        className="btn btn-success col-12 p-4 mb-5"
      >
        Multi Player
      </Link>
    </div>
  )
}