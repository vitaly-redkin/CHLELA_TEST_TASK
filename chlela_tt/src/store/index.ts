/**
 * The rot file of the Redux store.
 */

import * as UploadedFileHandler from './UploadedFileHandler';

// The top-level state object
export interface IApplicationState {
  uploadedFile: UploadedFileHandler.IUploadedFileState;
}

// Inital application state
export const initialState: IApplicationState = {
  uploadedFile: UploadedFileHandler.initialState
};

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  uploadedFile: UploadedFileHandler.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => IApplicationState) => void;
