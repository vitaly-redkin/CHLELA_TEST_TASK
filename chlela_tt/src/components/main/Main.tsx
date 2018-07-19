/**
 * The main component (to contain everything else)
 */

import * as React from 'react';
import DropZone from '../dropzone/DropZone';
import KonvaBox from '../konvabox/KonvaBox';
import LoadButton from '../loadbutton/LoadButton';
import * as styles from './Main.css';

/**
 * The main component (to contain everything else)
 */
export class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.Main}>
        <DropZone>
          <KonvaBox/>
        </DropZone>
        <LoadButton />
      </div>
    );
  }
}
