import React from 'react';
import {observer} from 'mobx-react-lite';

import {RootStoreProvider} from './store/rootStoreContext';
import RootStore from './store/rootStore';
import RootNavigator from './navigation/RootNavigator';

function App(): JSX.Element {
  return (
    <RootStoreProvider value={new RootStore()}>
      <RootNavigator />
    </RootStoreProvider>
  );
}

export default observer(App);
