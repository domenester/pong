import { Panel } from "../panel";
import { Stick } from "../stick";

export class KeyboardEvents {

  constructor(
    private panel: Panel
  ) { }

  bootstrap = () => {
    document.onkeydown = this.listenKey;
  }

  handleUp = (stick: Stick, moveSize: number) => {
    const y = stick.position.getY()
    if (y <= 0) return;
    stick.clear()
    stick.position.setY(y - moveSize)
    stick.print()
  }

  handleDown = (stick: Stick, moveSize: number, panelHeight: number) => {
    const y = stick.position.getY()
    if (y >= panelHeight - stick.height) return;
    stick.clear()
    stick.position.setY(y + moveSize)
    stick.print()
  }

  handleW = () => {
    const { leftStick, moveSize } = this.panel
    this.handleUp(leftStick, moveSize)
  }

  handleS = () => {
    const { leftStick, moveSize, height } = this.panel
    this.handleDown(leftStick, moveSize, height)
  }

  handleArrowUp = () => {
    const { rightStick, moveSize } = this.panel
    this.handleUp(rightStick, moveSize)
  }

  handleArrowDown = () => {
    const { rightStick, moveSize, height } = this.panel
    this.handleDown(rightStick, moveSize, height)
  }

  listenKey = (e: any) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38: return this.handleArrowUp()
      case 40: return this.handleArrowDown()
      case 87: return this.handleW()
      case 83: return this.handleS()
    }
  }
}