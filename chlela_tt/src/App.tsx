/**
 * The application root component.
 */

import * as React from 'react';
import {Main} from './components/main/Main';

export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Main/>
    );
  }
}
