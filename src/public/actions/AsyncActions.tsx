import * as AsyncActionNames from './AsyncActionNames'
import {Type} from './Actions'

//AjaxActions
export type AsyncAction = CreateGameAction;
export type CreateGameAction = CreateGameRequest | CreateGameSuccess | CreateGameFailure

export interface CreateGameRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_REQUEST,
  payload: {}
}

export interface CreateGameSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_SUCCESS
  payload: {
    data: unknown
  }
}

export interface CreateGameFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_CREATE_GAME_FAILURE
  payload: {
    error: unknown
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