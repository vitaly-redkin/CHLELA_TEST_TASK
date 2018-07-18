/**
 * The componentwith button to load file manually.
 */

import * as React from 'react';
import * as styles from './LoadButton.css';

export class LoadButton extends React.Component<{}, {}> {

  private _inputFileEl : HTMLInputElement;

  public render(): JSX.Element {
    return (
      <div className={styles.LoadButtonDiv}>
        <button
          className={styles.LoadButton}
          onClick={this.handleClick}>
          Load Image
         </button>

         <input
          type='file'
          className={styles.inputFile}
          ref={this.setInputFileRef}
          accept='.png,.gif,.jpg,.jpeg'
          multiple={false}
          onChange={this.onFileSelected}
          />
      </div>
    );
  }

  public componentDidMount(): void {
  }

  private handleClick = () : void => {
    this._inputFileEl.click();
  }

  private setInputFileRef = (ref: HTMLInputElement) : void => {
    this._inputFileEl = ref;
  }

  private onFileSelected = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(evt!.target!.files);
  }
}
