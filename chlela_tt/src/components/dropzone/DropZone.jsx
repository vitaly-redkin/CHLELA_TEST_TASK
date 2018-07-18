/**
 * The component to serve as a zone to drop the files to.
 * 
 * Implemented in Javasctript instead of TypeScript since 
 * the use third-party component (react-dropzone) cannot be
 * compiled with TypeScript 2.9 and/or MS TSlint rules used.
 */

import * as React from 'react';
import Dropzone from 'react-dropzone';
import * as styles from './DropZone.css';

export class DropZone extends React.Component {
  
  onDropAccepted = (files) => {
    console.log(files);
  }

  render()  {

    return (
      <Dropzone 
        onDropAccepted={this.onDropAccepted}
        accept='image/png, image/jpg, image/jpeg, image/gif'
        disableClick={true}
        multiple={false}
        className={styles.dropzone}
        activeClassName={styles.active}
        acceptClassName={styles.accepted}
        rejectClassName={styles.rejected}
      >
        <p>Drop Some Image Files Here</p>
        {this.props.children}
      </Dropzone>
    );
  }
}
