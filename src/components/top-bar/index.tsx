import React from 'react'
import './top-bar.scss'

interface ITopBar {
  height: number,
  score: number,
  higherScore: number,
  lastScore: number
}

export function TopBar (props: ITopBar) {
  return (
    <div className='top-bar row text-center' style={{height: props.height}}>
      <div className='col-4'>
        Score: {props.score}
      </div>
      <div className='col-4'>
        Last Score: {props.lastScore}
      </div>
      <div className='col-4'>
        Higher Score: {props.higherScore}
      </div>
    </div>
  )
}