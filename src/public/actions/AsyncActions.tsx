import * as AsyncActionNames from './AsyncActionNames'
import {Type} from './Actions'
import { GameResponseSuccess } from 'store/Service';
import {ErrorState} from '../store/State' 

//AjaxActions
export type AsyncAction = CreateGameAction | JoinGameAction;
export type CreateGameAction = CreateGameRequest | CreateGameSuccess | CreateGameFailure;
export type JoinGameAction = JoinGameRequest | JoinGameSuccess | JoinGameFailure;

export interface CreateGameRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_REQUEST,
  payload: {}
}

export interface CreateGameSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_SUCCESS
  payload: {
    data: GameResponseSuccess
  }
}

export interface CreateGameFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_FAILURE
  payload: {
    error: ErrorState
  }
}

export interface JoinGameRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_JOIN_GAME_REQUEST
  payload: {}
}

export interface JoinGameSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_JOIN_GAME_SUCCESS
  payload: {
    data: unknown
  }
}

export interface JoinGameFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_JOIN_GAME_FAILURE
  payload: {
    error: unknown
  }
}