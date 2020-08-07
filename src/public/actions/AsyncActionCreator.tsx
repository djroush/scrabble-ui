import * as AsyncActionTypes from '../actions/AsyncActionNames';
import * as AsyncActions from '../actions/AsyncActions';
import {Type} from '../actions/Actions';
import { GameResponseSuccess } from 'store/Service';
import { ErrorState } from 'store/State';

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
export const gamePendingSuccess = (data: GameResponseSuccess) : AsyncActions.GamePendingSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_PENDING_SUCCESS,
  payload: {
    data
  }
});
export const gamePendingFailure = (error: ErrorState) : AsyncActions.GamePendingFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_GAME_PENDING_FAILURE,
  payload: {
    error
  }
});