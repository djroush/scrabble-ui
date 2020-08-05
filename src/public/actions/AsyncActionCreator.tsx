import * as AsyncActionTypes from '../actions/AsyncActionNames';
import * as AsyncActions from '../actions/AsyncActions';
import {Type} from '../actions/Actions';
import { GameResponseSuccess } from 'store/Service';

export const createGameRequest = () : AsyncActions.CreateGameRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_REQUEST,
  payload: {}
});
export const createGameSuccess = (data: GameResponseSuccess) : AsyncActions.CreateGameSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_SUCCESS,
  payload: {
    data
  }
});
export const createGameFailure = (error: unknown) : AsyncActions.CreateGameFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_FAILURE,
  payload: {
    error
  }
});

export const joinGameRequest = () : AsyncActions.JoinGameRequest => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_JOIN_GAME_REQUEST,
  payload: {}
});
export const joinGameSuccess = (data: unknown) : AsyncActions.JoinGameSuccess => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_JOIN_GAME_SUCCESS,
  payload: {
    data
  }
});
export const joinGameFailure = (error: unknown) : AsyncActions.JoinGameFailure => ({
  type: Type.SYNC,
  action: AsyncActionTypes.ASYNC_JOIN_GAME_FAILURE,
  payload: {
    error
  }
});