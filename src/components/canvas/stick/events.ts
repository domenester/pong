import { Panel } from "../panel";
import { Stick } from "../stick";

export class StickEvent {

  public leftStick: Stick
  public lastSceenY = 0

  constructor(
    private panel: Panel
  ) {
    this.leftStick = panel.leftStick
  }

  bootstrap = () => {
    document.addEventListener('mousemove', this.onMouseMoveHandler);
  }

  onMouseMoveHandler = (mouseEvent: any) => {
    const { y } = mouseEvent
    const { position: { setY, getY }, height } = this.leftStick
    const higher = this.panel.height - height
    let newY = y > higher ? higher : y
    if (newY !== getY()) {
      this.leftStick.clear()
      setY( newY > higher ? higher : newY )
      this.leftStick.print()
    }
  }
}