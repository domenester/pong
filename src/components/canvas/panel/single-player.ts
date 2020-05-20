import { TDispatch } from "../../../shared/state-handler";
import { ISocketService } from "../../../services";
import { Panel, mode } from ".";

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

  resetSticks = () => {
    this.leftStick.reset()
  }

  drawElements() {
    const { leftStick, ball } = this
    leftStick.print()
    ball.print()
  }
}