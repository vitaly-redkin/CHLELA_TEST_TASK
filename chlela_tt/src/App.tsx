/**
 * The application root component
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import {Main} from './components/main/Main';
import {configureStore, StoreType} from './configureStore';

// Redux store to use in the application
const store: StoreType = configureStore();

/**
 * The application root component
 */
export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}
