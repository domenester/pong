import React, { useEffect, useState } from 'react';
import './panel.scss';
import { Panel } from '../canvas/panel';
import { TopBar } from '../top-bar';

export default function PanelComponent() {

  const { clientWidth, clientHeight } = document.documentElement
  const [width, setWidth] = useState(clientWidth);
  const [topBarHeight] = useState(width / 20);
  const [height, setHeight] = useState(clientHeight - topBarHeight);
  let panel: Panel

  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [higherScore, setHigherScore] = useState(0);

  const init = () => {
    const el: any = document.getElementById('panel')
    const canvas = el.getContext("2d")
    panel = new Panel(
      canvas,
      width,
      height,
      { setScore, setLastScore, setHigherScore}
    )
    panel.bootstrap()
  }

  useEffect(() => {
    init()
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = document.documentElement
      setWidth(clientWidth)
      setHeight(clientHeight - 8)
      panel.width = width
      panel.height = height
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBar
        height={topBarHeight}
        score={score}
        lastScore={lastScore}
        higherScore={higherScore}
      />
      <canvas
        id="panel"
        className="panel"
        width={width}
        height={height}
      />
    </>
  );
}
