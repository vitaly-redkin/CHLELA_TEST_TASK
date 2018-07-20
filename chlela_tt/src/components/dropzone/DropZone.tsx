/**
 * The TypeScript and Redux wrapper around the DropZoneJS component
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import {DropZoneJS} from './DropZoneJS';

// Component properties type
type DropZoneProps =
  (IUploadedFileState           // ... state we've requested from the Redux store
    & typeof actionCreators     // ... plus action creators we've requested
    & React.Props<{}>);

/**
 * The TypeScript and Redux wrapper around the DropZoneJS component
 */
class DropZone extends React.Component<DropZoneProps, {}> {

  public render(): JSX.Element {
    return (
      <DropZoneJS onFileDropped={this.onFileDropped}>
        {this.props.children}
      </DropZoneJS>
    );
  }

  /**
   * Handler for the "fileDropped" event
   *
   * @param file File user dropped on the drop zone
   */
  public onFileDropped = (file: File) : void => {
    this.props.setUploadedFile(file);
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : IUploadedFileState {
  return state.uploadedFile;
}

// Redux-Wrapped component
export default connect(
  mapStateToProps,
  actionCreators
)(DropZone);
