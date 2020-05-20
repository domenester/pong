import { PanelSinglePlayer } from "../../panel/single-player";
import { StickEvent } from "./events";

export class StickEventSinglePlayer extends StickEvent {
  constructor(
    public panel: PanelSinglePlayer
  ) {
    super(panel)
  }
}