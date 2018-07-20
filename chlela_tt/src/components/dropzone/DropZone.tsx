/**
 * The component to serve as a zone to drop the files to
 *
 * Uses third-party component (react-dropzone)
 */

import * as React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import {Consts} from '../../util/Consts';
import {acceptFile} from '../../util/Util';
import * as styles from './DropZone.css';

// Component properties type
type DropZoneProps =
  (IUploadedFileState
    & typeof actionCreators
    & React.Props<{}>);

/**
 * The component to serve as a zone to drop the files to
 *
 * Uses third-party component (react-dropzone)
 */
export class DropZone extends React.Component<DropZoneProps, {}> {

  public render(): JSX.Element {
    return (
      <Dropzone
        onDropAccepted={this.onDropAccepted}
        accept={Consts.ACCEPTED_MIME_TYPES}
        disableClick={true}
        multiple={false}
        className={styles.dropzone}
        activeClassName={styles.active}
        acceptClassName={styles.accepted}
        rejectClassName={styles.rejected}
      >
        {this.props.children}
      </Dropzone>
    );
  }

  /**
   * Handler for the dropAccepted event
   *
   * @param files Files user dropped on the drop zone. The dropzone is configured to allow only single files to be dropped.
   */
  public onDropAccepted = (files: File[]) => {
    if (files.length === 1 && acceptFile(files[0])) {
      this.props.setUploadedFile(files[0]);
    }
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
