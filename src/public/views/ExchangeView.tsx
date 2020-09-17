import React from 'react';

import '../styles/ExchangeStyle.css';
import { ExchangeProps } from '../containers/ExchangeContainer'
import { Tile } from '../types/State' 

const Exchange = (props: ExchangeProps)  => {
  const {tiles, onKeyDown} = props;
  const exchangeTiles = !tiles ? "" : tiles.map((tile: Tile, index: number) => (
    <div key={index} className="exchangeTile"><span>{tile.letter}</span></div>
  ));
  
  return (
  <div tabIndex={300} className="exchange" onKeyDown={onKeyDown}>
    {exchangeTiles} 
  </div>
  );
}

export default Exchange;
