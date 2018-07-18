/**
 * The TypeScript and Redux wrapper around the DropZoneJS component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import {DropZoneJS} from './DropZoneJS';

// At runtime, Redux will merge together...
type DropZoneProps =
  (IUploadedFileState           // ... state we've requested from the Redux store
    & typeof actionCreators     // ... plus action creators we've requested
    & React.Props<{}>);

class DropZoneInt extends React.Component<DropZoneProps, {}> {

  public render(): JSX.Element {
    return (
      <DropZoneJS onFileDropped={this.onFileDropped}>
        {this.props.children}
      </DropZoneJS>
    );
  }

  private onFileDropped = (file: File) : void => {
    this.props.setUploadedFile(file);
  }
}

function mapStateToProps(state: IApplicationState) : IUploadedFileState {
  return state.uploadedFile;
}

// Wire up the React component to the Redux store
const DropZone = connect(
  mapStateToProps,
  actionCreators
)(DropZoneInt);

export default DropZone;
