/**
 * Redux store configurator.
 */

import {
  AnyAction, applyMiddleware, combineReducers, compose, createStore,
  Reducer, ReducersMapObject, Store, StoreEnhancerStoreCreator
} from 'redux';
import reduxThunk from 'redux-thunk';
import {IApplicationState, initialState, reducers } from './store';

export type StoreType = Store<IApplicationState, AnyAction>;

export function configureStore() : StoreType {
/*
  const createStoreWithMiddleware = compose(
    applyMiddleware(reduxThunk),
    <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore);

  const allReducers = buildRootReducer(reducers);
  return createStoreWithMiddleware(allReducers, initialState);
*/
  return compose(
    applyMiddleware(reduxThunk),
    <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore)(buildRootReducer(reducers), initialState);
}

function buildRootReducer(allReducers: ReducersMapObject<IApplicationState, AnyAction>):
  Reducer<IApplicationState, AnyAction> {
  return combineReducers<IApplicationState>(allReducers);
}
