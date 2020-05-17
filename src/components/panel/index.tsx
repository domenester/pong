import React, { useEffect, useState } from 'react';
import './panel.scss';
import { Panel } from './panel';

export default function PanelComponent() {

  const { clientWidth, clientHeight } = document.documentElement
  const [width, setWidth] = useState(clientWidth);
  const [height, setHeight] = useState(clientHeight - 8);
  let panel: Panel

  const init = () => {
    const el: any = document.getElementById('panel')
    const canvas = el.getContext("2d")
    panel = new Panel( canvas, width, height )
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
  }, []);

  return (
    <canvas
      id="panel"
      className="panel"
      width={width}
      height={height}
    >
    </canvas>
  );
}
