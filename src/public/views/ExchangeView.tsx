import React from 'react';

import '../css/Exchange.css';
import { ExchangeProps } from '../containers/Exchange'
import { Tile } from '../store/State' 

const Rack = (props: ExchangeProps)  => {
  const {tiles, onKeyDown} = props;
  const exchangeTiles = !tiles ? "" : tiles.map((tile: Tile, index: number) => (
    <div key={index} className="exchangeTile" data-index={index} data-letter={tile.letter} data-isBlank={tile.isBlank}><span>{tile.letter}</span></div>
  ));
  
  return (
  <div tabIndex={300} className="exchange" onKeyDown={onKeyDown}>
    {exchangeTiles} 
  </div>
  );
}

export default Rack;
