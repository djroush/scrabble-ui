import { AppState, Tile } from '../store/State';

export const takeRackLetter = (appState: AppState, key: string) => {
  const rackLetters: string[] = [...appState.rack.letters];
  const exchangeLetters: string[] = [...appState.exchange.letters];
  const turnTiles: Tile[] = appState.turn.tiles;
  
  const tilesPlayed = turnTiles.length;
  const areTilesPlayed = tilesPlayed > 0;
  const isAlphabetic: boolean = key >= 'A' && key <= 'Z' || key == ' ';
  //TODO: check what Space.toUppercase() looks like

  if (isAlphabetic && !areTilesPlayed) {
    let rackIndex: number = 0;
    let blankIndex: number = -1;
    const rackSize = rackLetters.length;
    for (let index = 0; index < rackSize; index++) {
      const rackLetter = rackLetters[index]; 
      if (rackLetter == key) {
        break;
      } else if (' ' == rackLetter) {
        blankIndex = rackIndex;
      }
      rackIndex++;
    };
    
    if (rackIndex < rackSize || blankIndex >= 0) {
      const playedLetterIndex = rackIndex < rackSize ? rackIndex : blankIndex;
      rackLetters.splice(playedLetterIndex, 1)[0];
      exchangeLetters.push(key);
      appState.rack.letters = rackLetters;
      appState.exchange.letters = exchangeLetters;
    }
  }
  
  return appState;
}

//TODO: finish implement this here
export const returnExchangeLetterLast = (appState: AppState): AppState => {
  let rackLetters: string[] = [...appState.rack.letters];
  let exchangeLetters: string[] = [...appState.exchange.letters];
  
  const exchangeIndex = exchangeLetters.length - 1;
  const key = exchangeLetters.splice(exchangeIndex, 1);
  rackLetters = rackLetters.concat(key);
  appState.rack.letters = rackLetters;
  appState.exchange.letters = exchangeLetters;
  return appState;
}


//TODO: finish implement this here
export const returnExchangeLetterIndex = (appState: AppState, exchangeIndex: number): AppState => {
  let rackLetters: string[] = [...appState.rack.letters];
  let exchangeLetters: string[] = [...appState.exchange.letters];
  
  const exchangeLength = exchangeLetters.length;
  if (exchangeIndex >=0 && exchangeIndex < exchangeLength) {
    const key = exchangeLetters.splice(exchangeIndex, 1);
    rackLetters = rackLetters.concat(key);
  }
  appState.rack.letters = rackLetters;
  appState.exchange.letters = exchangeLetters;
  return appState;
}

//TODO: finish implement this here
export const returnExchangeLetters = (appState: AppState): AppState => {
  let rackLetters: string[] = [...appState.rack.letters];
  let exchangeLetters: string[] = [...appState.exchange.letters];
  
  rackLetters = rackLetters.concat(exchangeLetters);
  exchangeLetters = [];
  
  appState.rack.letters = rackLetters;
  appState.exchange.letters = exchangeLetters;
  
  return appState;
}

//TODO: unimplemented 
export const exchangeLetters = (appState: AppState) => {
  let rackLetters: string[] = [...appState.rack.letters];
  let exchangeLetters: string[] = [...appState.exchange.letters];
  
  //TODO: invoke middleware here
   rackLetters = rackLetters.concat(exchangeLetters);    
   exchangeLetters = []
   
   appState.rack.letters = rackLetters;
   appState.exchange.letters = exchangeLetters;
  
  return appState;
}