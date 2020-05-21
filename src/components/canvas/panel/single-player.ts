import { TDispatch } from "../../../shared/state-handler";
import { ISocketService } from "../../../services";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Panel, mode } from ".";
import { BallEventsSinglePlayer } from "../ball/events/single-player.events";
import { StickEventSinglePlayer } from "../stick/events/single-player.events";

export class PanelSinglePlayer extends Panel {

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
  }

  bootstrap = () => {
    this.drawElements()
    const ballEvents = new BallEventsSinglePlayer(this)
    ballEvents.bootstrap()
    const stickEvents = new StickEventSinglePlayer(this)
    stickEvents.bootstrap()
  }

  resetSticks = () => {
    this.leftStick.reset()
  }

  drawElements = () => {
    const { leftStick, ball } = this
    leftStick.print()
    ball.print()
  }
}