import { Stick } from "../stick";
import { PanelSinglePlayer } from "../../panel/single-player";
import { PanelMultiPlayer } from "../../panel/multi-player";
import { Panel } from "../../panel";

export class StickEvent {

  public leftStick: Stick
  public lastSceenY = 0

  constructor(
    public panel: Panel
  ) {
    this.leftStick = panel.leftStick
  }

  bootstrap() {
    document.addEventListener('mousemove', this.onMouseMoveHandler);
  }

  onMouseMoveHandler = (mouseEvent: any) => {
    const { y } = mouseEvent
    this.handleStickMove(y, this.panel.player)
  }

  handleStickMove = (y: number, player: number) => {
    const stickToHandle = this.leftStick
    const { position: { setY, getY }, height } = stickToHandle
    const { topBarHeight } = this.panel
    const top = (this.panel.height + topBarHeight) - height
    if (y !== getY() && y < top && y >= topBarHeight) {
      stickToHandle.clear()
      setY(y - topBarHeight)
      stickToHandle.print()
    }
  }
}