import { Position } from "../position";
import { Stick } from "../stick";
import { TDispatch } from "../../../shared/state-handler";
import { ISocketService } from "../../../services";
import { Panel, mode } from ".";

export class PanelMultiPlayer extends Panel {

  public rightStick: Stick

  constructor(
    public mode: mode,
    public dispatch: TDispatch,
    public socketService: ISocketService,
    public player: number,
    public room: string
  ) {
    super(
      mode,
      dispatch,
      socketService,
      player,
      room
    )
    this.rightStick = new Stick(
      this.ctx,
      new Position(
        this.width - this.stickWidth,
        0
      ),
      this.defaultColor,
      this.stickWidth,
      this.stickHeight
    )
  }

  isMultiplayer = () => {
    return this.mode === 'multiplayer'
  }

  getOtherPlayer = () => {
    return this.player === 1 ? 2 : 1
  }

  resetSticks = () => {
    this.leftStick.reset()
    this.rightStick.reset()
  }

  drawElements() {
    const { leftStick, ball, rightStick } = this
    leftStick.print()
    ball.print()
    rightStick.print()
  }
}