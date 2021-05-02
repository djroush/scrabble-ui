import {SseGameAttachAction, SseGameDetachAction, SseGameInfo } from "./SseActions"
import * as EventNames from './SseActionNames'
import { Type } from "."
 
export const gameAttachAction = (payload: SseGameInfo) : SseGameAttachAction => ({
  type: Type.SSE,
  action: EventNames.GAME_ATTACH_EVENT,
  payload: payload 
})
export const gameDetachAction = () : SseGameDetachAction => ({
  type: Type.SSE,
  action: EventNames.GAME_DETACH_EVENT,
  payload: {}
})
// export const gameUpdateAction = (payload: SseGameUpdateEvent) : SseGameUpdateAction => ({
//   type: Type.SSE,
//   action: EventNames.GAME_UPDATE_EVENT,
//   payload: payload 
// })

// export const gameHeartbeatAction = (payload: SseGameHeartbeatEvent) : SseGameHeartbeatAction => ({
//   type: Type.SSE,
//   action: EventNames.GAME_HEARTBEAT_EVENT,
//   payload: payload 
// })

// export const gameCompleteAction = (payload: SseGameCompleteEvent) : SseGameCompleteAction => ({
//   type: Type.SSE,
//   action: EventNames.GAME_COMPLETE_EVENT,
//   payload: payload
// })