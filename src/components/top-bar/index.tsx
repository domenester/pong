import React from 'react'
import './top-bar.scss'
import { useStateValue } from '../../shared/state-handler'
import { mode } from '../canvas/panel'

interface ITopBar {
  height: number
  mode: mode
}

export function TopBar (props: ITopBar) {
  const { state: { panel, topBar } } = useStateValue()

  const isMultiplayer = () => props.mode === 'multiplayer'

  const col = isMultiplayer() ? 'col-3' : 'col-4'

  return (
    <div className='top-bar row text-center' style={{height: topBar.height}}>
      { isMultiplayer() &&
        <div className='col-3'>
          Score: {panel.player1Score} x {panel.player2Score}
        </div>
      }
      <div className={col}>
        Hits: {panel.hit}
      </div>
      <div className={col}>
        Last Hits Count: {panel.lastHit}
      </div>
      <div className={col}>
        Higher Hits Count: {panel.higherHit}
      </div>
    </div>
  )
}