import { AppState, Tile, PlayedTile } from '../store/State';

export const takeRackTile = (appState: AppState, key: string) => {
  const rackTiles: Tile[] = [...appState.rack.tiles];
  const exchangeTiles: Tile[] = [...appState.exchange.tiles];
  const playedTiles: PlayedTile[] = appState.turn.playedTiles;
  
  const tilesPlayed = playedTiles.length;
  const areTilesPlayed = tilesPlayed > 0;
  const isAlphabetic: boolean = key >= 'A' && key <= 'Z' || key === ' ';
  //TODO: check what Space.toUppercase() looks like

  if (isAlphabetic && !areTilesPlayed) {
    let rackIndex: number = 0;
    let blankIndex: number = -1;
    const rackSize = rackTiles.length;
    for (let index = 0; index < rackSize; index++) {
      const rackTile = rackTiles[index]; 
      if (rackTile.letter == key) {
        break;
      } else if (rackTile.isBlank) {
        blankIndex = rackIndex;
      }
      rackIndex++;
    };
    
    if (rackIndex < rackSize || blankIndex >= 0) {
      const playedTileIndex = rackIndex < rackSize ? rackIndex : blankIndex;
      const playedTile: Tile = rackTiles.splice(playedTileIndex, 1)[0];
      exchangeTiles.push(playedTile);
      appState.rack.tiles = rackTiles;
      appState.exchange.tiles = exchangeTiles;
    }
  }
  return appState;
}

export const returnExchangeTileLast = (appState: AppState): AppState => {
  let rackTiles: Tile[] = [...appState.rack.tiles];
  let exchangeTiles: Tile[] = [...appState.exchange.tiles];
  
  const exchangeIndex = exchangeTiles.length - 1;
  const exchangedTile = exchangeTiles.splice(exchangeIndex, 1);
  rackTiles = rackTiles.concat(exchangedTile);
  appState.rack.tiles = rackTiles;
  appState.exchange.tiles = exchangeTiles;
  return appState;
}


//TODO: finish implement this here
export const returnExchangeLetterIndex = (appState: AppState, exchangeIndex: number): AppState => {
  let rackTiles: Tile[] = [...appState.rack.tiles];
  let exchangeTiles: Tile[] = [...appState.exchange.tiles];
  
  const exchangeLength = exchangeTiles.length;
  if (exchangeIndex >=0 && exchangeIndex < exchangeLength) {
    const rackTile: Tile[] = exchangeTiles.splice(exchangeIndex, 1);
    rackTiles = rackTiles.concat(rackTile);
  }
  appState.rack.tiles = rackTiles;
  appState.exchange.tiles = exchangeTiles;
  return appState;
}

export const returnExchangeTiles = (appState: AppState): AppState => {
  let rackTiles: Tile[] = [...appState.rack.tiles];
  let exchangeTiles: Tile[] = [...appState.exchange.tiles];
  
  rackTiles = rackTiles.concat(exchangeTiles);
  exchangeTiles = [];
  
  appState.rack.tiles = rackTiles;
  appState.exchange.tiles = exchangeTiles;
  
  return appState;
}

export const exchangeTiles = (appState: AppState) => {
  let rackTiles: Tile[] = [...appState.rack.tiles];
  let exchangeTiles: Tile[] = [...appState.exchange.tiles];
  
  //TODO: invoke middleware here
   rackTiles = rackTiles.concat(exchangeTiles);    
   exchangeTiles = []
   
   appState.rack.tiles = rackTiles;
   appState.exchange.tiles = exchangeTiles;
  
  return appState;
}
