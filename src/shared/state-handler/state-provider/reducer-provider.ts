import { PanelReducers } from "../panel";
import { TopBarReducers } from "../top-bar";
import { CounterDownReducers } from "../counter-down";

const reducers: {
  [key: string]: ( state: any, payload: any ) => { [key: string]: any }
 } = {
   ...PanelReducers,
   ...TopBarReducers,
   ...CounterDownReducers
 }

export default (state: any, action: {
  type: string, payload: any
}) => {
  if (!reducers[action.type]) {
    throw new Error('Action type not registered in reducers.')
  }
  return reducers[action.type](state, action.payload)
};