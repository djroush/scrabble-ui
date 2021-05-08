import {AsyncAction} from './AsyncActions'
import {SyncAction} from './SyncActions'
import {SseAction} from './SseActions'

//AppActions
export type AppAction = SyncAction | AsyncAction | SseAction

export enum Type {
    SYNC, ASYNC, SSE
}
