/**
 * The main component (to contain everythingn else).
 */

import * as React from 'react';
import {DropZone} from '../dropzone/DropZone';
import {LoadButton} from '../loadbutton/LoadButton';

import * as styles from './Main.css';

export class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.Main}>
        <DropZone />
        <LoadButton />
      </div>
    );
  }
}
