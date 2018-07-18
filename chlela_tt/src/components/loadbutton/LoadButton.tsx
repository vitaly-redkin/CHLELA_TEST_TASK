/**
 * The component with button to load file manually.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import {Consts} from '../../utils/Consts';
import {acceptFile} from '../dropzone/DropZoneJS';
import * as styles from '../loadbutton/LoadButton.css';

// At runtime, Redux will merge together...
type LoadButtonProps =
  (IUploadedFileState            // ... state we've requested from the Redux store
    & typeof actionCreators     // ... plus action creators we've requested
    & React.Props<{}>);

class LoadButtonInt extends React.Component<LoadButtonProps, {}> {

  private inputFileEl : HTMLInputElement;

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
          accept={this.acceptedExtensions}
          multiple={false}
          onChange={this.onFileSelected}
          />

          <div>
            Name: {this.props.file ? this.props.file.name : 'Undefined'}
          </div>
      </div>
    );
  }

  private get acceptedExtensions() {
    return Consts.ACCEPTED_MIME_TYPES.replace('image/', '.');
  }

  private handleClick = () : void => {
    this.inputFileEl.click();
  }

  private setInputFileRef = (ref: HTMLInputElement) : void => {
    this.inputFileEl = ref;
  }

  private onFileSelected = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt && evt.target && evt.target.files && evt.target.files.length === 1) {
      const file : File = evt.target.files[0];
      if (acceptFile(file)) {
        this.props.setUploadedFile(file);
      } else {
        alert('Invalid file: {file.name}');
      }
    }
  }
}

function mapStateToProps(state: IApplicationState) : IUploadedFileState {
  return state.uploadedFile;
}

// Wire up the React component to the Redux store
const LoadButton = connect(
  mapStateToProps,
  actionCreators
)(LoadButtonInt);

export default LoadButton;
