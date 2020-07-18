import * as ActionType from './ActionTypes'
import { AppState } from './State';
import {takeFromRack} from './RackReducer';
import {updateActiveSquare} from './BoardReducer';
import {AppAction, PlayRackLetterAction, UpdateActiveSquareAction} from './Actions';

const initialState : AppState = {
  rack: {
    letters: ['T','E','S','T','I','N','G'], 
  },
  board: {
    activeIndex: null,
    direction: null,
    tiles: new Array<string>(255),
  },
  playerDisplay: {
    players: [
      {name: 'Rutherford',score:26},
      {name: 'Friedrich',score:18},
      {name: 'Sebastian',score:28},
      {name: 'Theodore',score:11}
    ],
    activePlayerIndex: 0
  }
};
const AppReducer = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case ActionType.PLAY_RACK_LETTER: {
      const playRackLetterAction: PlayRackLetterAction = action; 
      const {index, letter} = playRackLetterAction.payload;
      takeFromRack(state, letter, index);
      break;
    }
    case ActionType.UPDATE_ACTIVE_SQUARE:
     const updateActiveSquareAction: UpdateActiveSquareAction = action;
     const {index} = updateActiveSquareAction.payload;
     updateActiveSquare(state, index);
    break;
    default:
    
      return state;
  }
}

export default AppReducer;

