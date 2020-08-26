import * as AsyncActionNames from './AsyncActionNames'
import {Type} from './Actions'
import { GameResponseSuccess } from 'store/Service';
import {ErrorState} from '../store/State' 

//AjaxActions
export type AsyncAction = GameUnknownAction | GamePendingAction | GameRefreshAction;
export type GameUnknownAction = GameUnknownRequest | GameUnknownSuccess | GameUnknownFailure;
export type GamePendingAction = GamePendingRequest | GamePendingSuccess | GamePendingFailure;
export type GameRefreshAction = GameRefreshRequest | GameRefreshSuccess | GameRefreshFailure;

export interface GameUnknownRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_UNKNOWN_REQUEST,
  payload: {}
}

export interface GameUnknownSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_UNKNOWN_SUCCESS
  payload: {
    data: GameResponseSuccess
  }
}

export interface GameUnknownFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_UNKNOWN_FAILURE
  payload: {
    error: ErrorState
  }
}

export interface GamePendingRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_PENDING_REQUEST
  payload: {}
}

export interface GamePendingSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_PENDING_SUCCESS
  payload: {
    data: GameResponseSuccess,
    eTag?: string
  }
}

export interface GamePendingFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_PENDING_FAILURE
  payload: {
    error: ErrorState
  }
}

export interface GameRefreshRequest {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_REFRESH_REQUEST
  payload: {}
}

export interface GameRefreshSuccess {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_REFRESH_SUCCESS
  payload: {
    data: GameResponseSuccess,
    eTag?: string
  }
}

export interface GameRefreshFailure {
  type: Type,
  action: typeof AsyncActionNames.ASYNC_GAME_REFRESH_FAILURE
  payload: {
    error: ErrorState
  }
}