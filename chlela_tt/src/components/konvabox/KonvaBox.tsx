/**
 * Component to show the loaded image using Konva
 */

import * as Konva from 'konva';
import * as lodash from 'lodash';
import * as React from 'react';
import { Image, Layer, Stage, Text } from 'react-konva';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { actionCreators, IUploadedFileState } from '../../store/UploadedFileHandler';
import * as styles from './KonvaBox.css';

// Component properties type
type KonvaBoxProps =
  (IUploadedFileState           // ... state we've requested from the Redux store
    & typeof actionCreators     // ... plus action creators we've requested
    & React.Props<{}>);

// Component state interface
interface IKonvaBoxState {
  domImage: HTMLImageElement;
  imageWidth: number;
  imageHeight: number;
  imageX: number;
  imageY: number;
}

/**
 * Component to show the loaded image using Konva
 */
class KonvaBoxInt extends React.Component<KonvaBoxProps, IKonvaBoxState> {

  /**
   * Property to show the current file name (or a "welcome: message).
   */
  private get fileName() : string {
    return (this.props.file !== null ? this.props.file.name : 'Drop some image file here');
  }

  // Refs to the HTML and Konva elements
  private containerDiv: HTMLDivElement;
  private stage: Stage;
  private text: Konva.Text | null;

  /**
   * Debounced Resize event handler
   */
  private debouncedResizehandler = lodash.debounce(this.onResizeHanler.bind(this), 50);

  /**
   * Constructor
   * Sets the initial component state
   */
  constructor() {
    super();

    const domImage: HTMLImageElement = document.createElement('img');
    this.state = {
      domImage: domImage,
      imageWidth: 0,
      imageHeight: 0,
      imageX: 0,
      imageY: 0
    };
  }

  public render(): JSX.Element {
    const imageMarkup: JSX.Element | null =
      (this.props.file !== null ?
        (
          <Image
            image={this.state.domImage}
            x={this.state.imageX}
            y={this.state.imageY}
            width={this.state.imageWidth}
            height={this.state.imageHeight}
            />
        ) :
        null);

    return (
      <div className={styles.konvabox} ref={this.setContainerRef}>
        <Stage ref={this.setStageRef}>
          <Layer>
            <Text
              text={this.fileName}
              align='center'
              y={15}
              fontSize={20}
              fill={'#ccc'}
              ref={this.setTextRef}/>
            {imageMarkup}
          </Layer>
        </Stage>
      </div>
    );
  }

  /**
   * Sets the initial state, wires DOM event handler
   */
  public componentDidMount() : void {
    this.layoutStage();
    window.addEventListener('resize', this.debouncedResizehandler);
  }

  /**
   * Updates Konva element layouts and,
   * if a new image arrived, makes Konva aware of this
   *
   * @param prevProps Previous properties
   */
  public componentDidUpdate(prevProps: KonvaBoxProps) : void {
    this.layoutStage(false);

    if (this.props.file !== prevProps.file) {
      this.setImage();
    }
  }

  /**
   * Removes DOM event handlers
   */
  public componentWillUnmount() : void {
    window.removeEventListener('resize', this.debouncedResizehandler);
  }

  /**
   * Reads uploaded image contents and sets Konva image element
   * to show it
   */
  private setImage = () : void => {
    const domImage: HTMLImageElement = document.createElement('img');
    const file: File | null = this.props.file;

    domImage.onload = (): void => {
      this.setImageDimensions(domImage);
    };

    if (file !== null) {
      const reader: FileReader = new FileReader();
      reader.onload = () : void => {
        domImage.src = reader.result;
      };
      reader.readAsDataURL(file as Blob);
    } else {
      domImage.src = '';
    }
  }

  /**
   * Sets image dimensions (size and position)
   * Scales the image to always fit the screen if necessary
   *
   * @param domImage DOM image element to use the properties of
   */
  private setImageDimensions = (domImage: HTMLImageElement): void => {
    const textHeight: number = (this.text !== null ? this.text.height() + this.text.y() : 30 + 15);
    const containerWidth: number = this.stage.getStage().width();
    const containerHeight: number = this.stage.getStage().height() - textHeight - 10;

    const domWidth: number = domImage.width;
    const domHeight: number = domImage.height;

    if (domWidth === 0 || domHeight === 0) {
      alert('Image size is not defined!');

      return;
    }

    const scaleX: number = containerWidth / domWidth;
    const scaleY: number = containerHeight / domHeight;
    const scale: number = Math.min(scaleX, scaleY, 1);

    const width: number = domWidth * scale;
    const height: number = domHeight * scale;

    const x: number = (width < containerWidth ? (containerWidth - width) / 2 : 0);
    const y: number = (height < containerHeight ? (containerHeight - height) / 2 : 0) + textHeight;

    this.setState({
      domImage: domImage,
      imageWidth: width,
      imageHeight: height,
      imageX: x,
      imageY: y
      });

  }

  /**
   * Handler of the Resize event
   */
  private onResizeHanler() : void {
    this.layoutStage();
  }

  /**
   * Sets the layout of the Konva Stage element depending on the current screen size.
   * Used when the component is mounted and the state/properies are updated.
   * Also used in the Resize event handler.
   *
   * @param doImageResizing If true (the default value) also sets image dimensions
   * (used on the window resize)
   */
  private layoutStage = (doImageResizing: boolean = true) : void => {
    const width: number = this.containerDiv.getBoundingClientRect().width;
    const height: number = this.containerDiv.getBoundingClientRect().height;

    this.stage.getStage().setWidth(width);
    this.stage.getStage().setHeight(height);

    if (this.text !== null) {
      this.text.setSize({ width: width - this.text.x(), height: 30});
    }

    if (doImageResizing && this.props.file !== null) {
      this.setImageDimensions(this.state.domImage);
    }
  }

  /**
   * Sets reference to the container DIV
   *
   * @param div Container DIV
   */
  private setContainerRef = (div: HTMLDivElement) : void => {
    this.containerDiv = div;
  }

  /**
   * Sets reference to the Konva Stage
   *
   * @param stage Konva Stage element
   */
  private setStageRef = (stage: Stage) : void => {
    this.stage = stage;
  }

  /**
   * Sets reference to the Konva Text element
   *
   * @param stage Konva Text element
   */
  private setTextRef = (text: Konva.Text | null) : void => {
    this.text = text;
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : IUploadedFileState {
  return state.uploadedFile;
}

// Redux-Wrapped component
const KonvaBox = connect(
  mapStateToProps,
  actionCreators
)(KonvaBoxInt);

export default KonvaBox;
