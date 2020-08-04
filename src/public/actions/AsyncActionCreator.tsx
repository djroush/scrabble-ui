import * as AsyncActionTypes from '../actions/AsyncActionNames';
import * as AsyncActions from '../actions/AsyncActions';
import {Type} from '../actions/Actions';

export const createGameRequest = () : AsyncActions.CreateGameRequest => ({
  type: Type.ASYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_REQUEST,
  payload: {}
});
export const createGameSuccess = (data: unknown) : AsyncActions.CreateGameSuccess => ({
  type: Type.ASYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_SUCCESS,
  payload: {
    data
  }
});
export const createGameFailure = (error: unknown) : AsyncActions.CreateGameFailure => ({
  type: Type.ASYNC,
  action: AsyncActionTypes.ASYNC_CREATE_GAME_FAILURE,
  payload: {
    error
  }
});

