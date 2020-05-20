import React, { createContext, useContext } from 'react';

interface IProviderGenerator {
  context: React.Context<any>;
  provider: ({ children }: any) => JSX.Element;
  useValue: () => any
}

export default function ProviderGenerator (
  buildValue: () => any,
  contextDefaultValue = {} as any,
): IProviderGenerator {
  const context = createContext(contextDefaultValue);
  const provider = ({ children }: any) => (
    <context.Provider value={buildValue()}>
      {children}
    </context.Provider>
  )
  const useValue = () => useContext(context);
  return {
    context,
    provider,
    useValue
  }
}