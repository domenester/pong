import React, { useEffect, useState } from 'react';
import './panel.scss';
import { Panel } from '../canvas/panel';
import { TopBar } from '../top-bar';
import { useSocketServiceValue, ISocketService } from '../../services';
import { getDimensions } from './util';
import { useStateValue } from '../../shared/state-handler';
import CounterDown from '../counter-down';

interface IPanelComponent {
  mode: 'singleplayer' | 'multiplayer'
}

export default function PanelComponent({ mode }: IPanelComponent) {

  const socketService: ISocketService = useSocketServiceValue()
  const { width, height, topBarHeight } = getDimensions(mode)
  let panel: Panel
  const { dispatch, state: { counterDown } } = useStateValue()
  const params = window.location.pathname.split('/')
  params.shift()

  const joinRoomIfIsPlayer2 = (player: number) => {
    return player === 2 && socketService.joinRoom(params[1])
  }

  const init = () => {

    dispatch({
      type: 'setTopBar',
      payload: {
        height: topBarHeight    
      }
    })

    const lastParam = +params[params.length - 1]
    const player = Number.isInteger(+lastParam) ? lastParam : 1

    joinRoomIfIsPlayer2(player)

    panel = new Panel(
      mode,
      dispatch,
      socketService,
      player,
      params[1]
    )
    panel.bootstrap()
  }

  const defineCanvasClass = () => {
    if (mode === 'multiplayer') {
      return 'panel mx-auto d-block'
    }
    return 'panel'
  }

  useEffect(() => {
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBar
        height={topBarHeight}
      />
      { counterDown.value !== 0 && <CounterDown/>}
      <canvas
        id="panel"
        className={defineCanvasClass()}
        width={width}
        height={height}
      />
    </>
  );
}
