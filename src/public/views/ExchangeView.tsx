import React from 'react';

import '../styles/ExchangeStyle.css';
import { ExchangeProps } from '../containers/ExchangeContainer'
import { Tile } from '../types/State' 

const Exchange = (props: ExchangeProps)  => {
  const {tiles, isExchangeEmpty, isRackEmpty, isAwaitingChallenge, onKeyDown} = props;
  const exchangeTiles = !tiles ? "" : tiles.map((tile: Tile, index: number) => (
    <div key={index} className="exchangeTile"><span>{tile.letter}</span></div>
  ));
  
  let className="exchange";
  if ((isExchangeEmpty && isRackEmpty) || isAwaitingChallenge) {
    className += " hidden";
  }
  return (
  <div tabIndex={300} className={className} onKeyDown={onKeyDown}>
    {exchangeTiles} 
  </div>
  );
}

export default Exchange;
