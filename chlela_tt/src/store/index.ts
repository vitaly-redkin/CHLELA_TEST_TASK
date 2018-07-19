/**
 * The root file of the Redux store
 */

import * as UploadedFileHandler from './UploadedFileHandler';

/**
 * Interface for the application state
 */
export interface IApplicationState {
  uploadedFile: UploadedFileHandler.IUploadedFileState;
}

/**
 * Inital application state
 */
export const initialState: IApplicationState = {
  uploadedFile: UploadedFileHandler.initialState
};

/**
 * Application reducers
 */
export const reducers = {
  uploadedFile: UploadedFileHandler.reducer
};

/**
 * This type can be used as a hint on action creators so that its 'dispatch' and
 * 'getState' params are correctly typed to match your store
 */
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => IApplicationState) => void;
