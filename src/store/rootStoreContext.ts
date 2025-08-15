import {createContext, useContext} from 'react';
import RootStore from './rootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('Wrap the application in a provider!');
  }
  return context;
};
