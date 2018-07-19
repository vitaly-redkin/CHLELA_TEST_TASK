/**
 * The component with button to load file manually
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import {Consts} from '../../util/Consts';
import {acceptFile} from '../../util/Util';
import * as styles from './LoadButton.css';

// Component properties type
type LoadButtonProps =
  (IUploadedFileState            // ... state we've requested from the Redux store
    & typeof actionCreators     // ... plus action creators we've requested
    & React.Props<{}>);

/**
 * The component with button to load file manually
 */
export class LoadButtonInt extends React.Component<LoadButtonProps, {}> {
  // Ref to the file input
  private inputFileEl : HTMLInputElement;

  public render(): JSX.Element {
    return (
      <div className={styles.LoadButtonDiv}>
        <button
          id={'loadButton'}
          className={styles.LoadButton}
          onClick={this.loadFile}
          >
          Load Image
         </button>

         <button
          id={'clearButton'}
          className={styles.LoadButton}
          onClick={this.clearFile}
          disabled={this.props.file === null}
          >
          Clear Image
         </button>

         <input
          type='file'
          className={styles.inputFile}
          ref={this.setInputFileRef}
          accept={this.acceptedExtensions}
          multiple={false}
          onChange={this.onFileSelected}
          />
      </div>
    );
  }

  /**
   * Returns comma-separated list of accepted image file extensions
   */
  private get acceptedExtensions() : string {
    return Consts.ACCEPTED_MIME_TYPES.replace('image/', '.');
  }

  /**
   * Opens file selection dialog
   */
  private loadFile = () : void => {
    this.inputFileEl.click();
  }

  /**
   * Clears uploaded file
   */
  private clearFile = () : void => {
    this.props.clearUploadedFile();
  }

  /**
   * Sets a reference to the file input
   *
   * @param ref File input element
   */
  private setInputFileRef = (ref: HTMLInputElement) : void => {
    this.inputFileEl = ref;
  }

  /**
   * Handler for the FileSeleced event
   *
   * @param evt Object with event details
   */
  private onFileSelected = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt && evt.target && evt.target.files && evt.target.files.length === 1) {
      const file : File = evt.target.files[0];
      if (acceptFile(file)) {
        this.props.setUploadedFile(file);
      } else {
        alert(`This is not an image file: ${file.name}
              \nOnly PNG, GIF, JPG and JPEG extensions supported`);
      }
    }
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : IUploadedFileState {
  return state.uploadedFile;
}

// Redux-Wrapped component
const LoadButton = connect(
  mapStateToProps,
  actionCreators
)(LoadButtonInt);

export default LoadButton;
