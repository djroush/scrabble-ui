import * as EventNames from './SseActionNames'
import {Type} from '.'
import { GameResponseSuccess } from 'types/Service';

export type SseAction = SseGameAttachAction | SseGameDetachAction;

export interface SseGameAttachAction {
  type: Type,
  action: typeof EventNames.GAME_ATTACH_EVENT
  payload: SseGameInfo
}
export interface SseGameDetachAction {
  type: Type,
  action: typeof EventNames.GAME_DETACH_EVENT
  payload: {}
}

export interface SseGameUpdateEvent {
  event: string,
  id: string,
  data: string
}
export interface SseGameHeartbeatEvent {
  event: string,
  data: string
}
export interface SseGameCompleteEvent {
  event: string,
  id: string,
  data: GameResponseSuccess
}
export interface SseGameInfo {
  gameId: string,
  playerId: string,
}