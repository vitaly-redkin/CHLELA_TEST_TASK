/**
 * The application root component.
 */

import * as React from 'react';
import * as styles from './App.css';

export class App extends React.Component<{}, {}> {
  public render() : JSX.Element {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={'./logo.svg'} className={styles.appLogo} alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
