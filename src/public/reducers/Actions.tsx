import ActionTypes from './ActionTypes'
import {RackState} from './State'

export type AppAction = RackAction;

export type RackAction = {
  type: ActionTypes
  letters: string[]
};

/* Action */
export const playRackLetters = (rack: RackState) : RackAction => ({
  type: ActionTypes.PLAY_RACK_LETTERS,
  letters: rack.letters
})
export const returnRackLetters = (rack: RackState) : RackAction => ({
  type: ActionTypes.RETURN_RACK_LETTERS,
  letters: rack.letters
})
/* Actions */
