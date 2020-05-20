import { useReducer } from 'react';
import reducers from './reducer-provider'
import initialStates from './initial-states-provider'
import ProviderGenerator from '../../provider-generator';

export type TDispatch =  ({ type, payload }: { type:string, payload: any }) => void;

interface IContextProps {
  state: any;
  dispatch: TDispatch;
}

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducers, initialStates);
  return { state, dispatch };
}

const providerGenerated = ProviderGenerator(
  buildValue,
  {} as IContextProps
)

const StateProvider = providerGenerated.provider;
const StateContext = providerGenerated.context;
const useStateValue = providerGenerated.useValue;

export {
  StateProvider,
  StateContext,
  useStateValue,
}