import * as AsyncActionTypes from '../actions/AsyncActionNames';
import * as AsyncActions from '../actions/AsyncActions';
import {Type} from '../actions/SyncActions';
import { GameResponseSuccess } from '../types/Service';
import { ErrorState } from '../types/State';

export const gameUnknownRequest = () : AsyncActions.GameUnknownRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_UNKNOWN_REQUEST,
  payload: {}
});
export const gameUnknownSuccess = (data: GameResponseSuccess) : AsyncActions.GameUnknownSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_UNKNOWN_SUCCESS,
  payload: {
    data
  }
});
export const gameUnknownFailure = (error: ErrorState) : AsyncActions.GameUnknownFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_UNKNOWN_FAILURE,
  payload: {
    error
  }
});

export const gamePendingRequest = () : AsyncActions.GamePendingRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_PENDING_REQUEST,
  payload: {}
});
export const gamePendingSuccess = (data: GameResponseSuccess, eTag?: string) : AsyncActions.GamePendingSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_PENDING_SUCCESS,
  payload: {
    data, eTag
  }
});
export const gamePendingFailure = (error: ErrorState) : AsyncActions.GamePendingFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_PENDING_FAILURE,
  payload: {
    error
  }
});
export const gameRefreshRequest = () : AsyncActions.GameRefreshRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_REFRESH_REQUEST,
  payload: {}
});
export const gameRefreshSuccess = (data: GameResponseSuccess, eTag?: string) : AsyncActions.GameRefreshSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_REFRESH_SUCCESS,
  payload: {
    data, eTag
  }
});
export const gameRefreshFailure = (error: ErrorState) : AsyncActions.GameRefreshFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_REFRESH_FAILURE,
  payload: {
    error
  }
});
export const gameActiveRequest = () : AsyncActions.GameActiveRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_ACTIVE_REQUEST,
  payload: {}
});
export const gameActiveSuccess = (data: GameResponseSuccess, eTag?: string) : AsyncActions.GameActiveSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_ACTIVE_SUCCESS,
  payload: {
    data, eTag
  }
});
export const gameActiveFailure = (error: ErrorState) : AsyncActions.GameActiveFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_ACTIVE_FAILURE,
  payload: {
    error
  }
});