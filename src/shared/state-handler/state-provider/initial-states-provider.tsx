import { PanelInitialState } from "../panel";
import { TopBarInitialState } from "../top-bar";
import { CounterDownInitialState } from "../counter-down";

export default {
  ...PanelInitialState(),
  ...TopBarInitialState(),
  ...CounterDownInitialState()
}