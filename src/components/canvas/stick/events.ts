import { Panel } from "../panel";
import { Stick } from "../stick";

export class StickEvent {

  public leftStick: Stick
  public rightStick: Stick
  public lastSceenY = 0

  constructor(
    private panel: Panel
  ) {
    this.leftStick = panel.leftStick
    this.rightStick = panel.rightStick
  }

  bootstrap = () => {
    document.addEventListener('mousemove', this.onMouseMoveHandler);
    this.panel.socketService.onMoveStick(
      (data: any) => {
        this.handleStickMove(data.y, this.panel.getOtherPlayer())
      }
    )
  }

  onMouseMoveHandler = (mouseEvent: any) => {
    const { y } = mouseEvent
    this.panel.socketService.stickMoved(y, this.panel.getOtherPlayer(), this.panel.room)
    this.handleStickMove(y, this.panel.player)
  }

  handleStickMove = (y: number, player: number) => {
    const stickToHandle = player === 1 ? this.leftStick : this.rightStick
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