/**
 * The component to serve as a zone to drop the files to
 * 
 * Implemented in Javascript instead of TypeScript since 
 * the used third-party component (react-dropzone) cannot be
 * compiled with TypeScript 2.9 and/or MS TSlint rules used
 */

import * as React from 'react';
import accepts from 'attr-accept';
import Dropzone from 'react-dropzone';
import * as styles from './DropZoneJS.css';
import {Consts} from '../../utils/Consts';

export class DropZoneJS extends React.Component {
  /**
   * Handler for the dropAccepted event
   * 
   * @param {File[]} files Files user dropped on the drop zone. The dropzone is configured to allow only single files to be dropped.
   */
  onDropAccepted = (files) => {
    if (files.length === 1 && acceptFile(files[0]))
      this.props.onFileDropped(files[0]);
  }

  render()  {
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
}

/**
 * Checks if the file has a valid MIME type 
 * (using the same code from the attr-accept 
 * the third party component uses)
 * 
 * @param {File} file File to check for the MIME type validity
 * @returns true if file has a valid MIME type or false otherwise
 */
export function acceptFile(file) {
  return accepts(file, Consts.ACCEPTED_MIME_TYPES);
}
