import React from 'react'
import './top-bar.scss'
import { useStateValue } from '../../shared/state-handler'

interface ITopBar {
  height: number
}

export function TopBar (props: ITopBar) {
  const { state: { panel, topBar } } = useStateValue()
  return (
    <div className='top-bar row text-center' style={{height: topBar.height}}>
      <div className='col-4'>
        Score: {panel.score}
      </div>
      <div className='col-4'>
        Last Score: {panel.lastScore}
      </div>
      <div className='col-4'>
        Higher Score: {panel.higherScore}
      </div>
    </div>
  )
}