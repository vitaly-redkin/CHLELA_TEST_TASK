/**
 * The Redux store stuff for the uploaded file
 */

import { Reducer } from 'redux';
import { AppThunkAction } from './';

/**
 * Interface for the uploaded file state
 */
export interface IUploadedFileState {
  file: File | null;
}

/**
 * Initial uploaded file state
 */
export const initialState: IUploadedFileState = {
  file: null
};

/**
 * Enumeration for the action type strings
 */
enum ActionTypeEnum {
  SetUploadedFile = '@@UPLOADED_FILE/SET',
  ClearUploadedFile = '@@UPLOADED_FILE/CLEAR'
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

/**
 * Interface for the SetUploadedFile actoion
 */
interface ISetUploadedFileAction {
  type: ActionTypeEnum;
  file: File;
}

/**
 * Interface for the ClearUploadedFile actoion
 */
interface IClearUploadedFileAction {
  type: ActionTypeEnum;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
 * declared type strings (and not any other arbitrary string)
 */
type KnownAction = ISetUploadedFileAction | IClearUploadedFileAction;

/**
 * ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
 * They don't directly mutate state, but they can have external side-effects (such as loading data)
 */
export const actionCreators = {
  setUploadedFile: (file: File): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.SetUploadedFile, file: file });
  },

  clearUploadedFile: (): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ClearUploadedFile });
  }
};

/**
 * REDUCER - For a given state and action, returns the new state
 * To support time travel, this must not mutate the old state
 *
 * @param state Current application state
 * @param incomingAction Dispatched Redux action
 *
 * @returns New application state
 */
export const reducer: Reducer<IUploadedFileState> =
  (state: IUploadedFileState, incomingAction: KnownAction): IUploadedFileState => {
    switch (incomingAction.type) {
      case ActionTypeEnum.SetUploadedFile:
        const action: ISetUploadedFileAction = <ISetUploadedFileAction> incomingAction;

        return { ...state, file: action.file };
      case ActionTypeEnum.ClearUploadedFile:
        return { ...state, file: null };
      default:
        // Do nothing - the final return will work
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || initialState;
  };
