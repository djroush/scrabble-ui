import { Dispatch } from 'redux';
import { AppState, RackState } from './State';
import { playRackLetters } from './Actions'
/* TODO  add types for messages! */




export const takeFromRack = (dispatch: Dispatch, getState: () => AppState) => {
  const appState: AppState = getState();
  const rack :RackState = appState.rack;
  let lettersExist: boolean = true;
  var lettersCopy: String[] = [...rack.letters];
  //make a copy of current letters 
  
  const test: String[] = ['T','A','B','O','U','L','I'];
  
  rack.letters.forEach(letter => {
    const index = test.findIndex((letter2) => letter2 == letter );  
    if (index > 0) {
      lettersCopy = lettersCopy.splice(index, 1);
    } else {
      lettersExist = false;
    }
    
    if (!lettersExist) {
      dispatch({
        type: 'error',
        error: 'Message goes here'
      })
    }
    //TODO: figure out blank
  });
  dispatch(playRackLetters(rack));
}




