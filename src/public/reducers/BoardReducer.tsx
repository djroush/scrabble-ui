import { AppState } from '../store/State';

export const updateActiveSquare = (appState: AppState, eventIndex: number) => {
  let {direction, activeIndex, ...others} = appState.board;
    if (activeIndex !== null && activeIndex === eventIndex) {
      if (direction === "horizontal") {
        direction = "vertical";
      } else {
        direction = "horizontal";
      }
    } else {
      activeIndex = eventIndex;
      direction = "horizontal";
    }
  
  appState.board = {
    activeIndex,direction,...others
  } 
  return appState;
};
