import React from 'react';

import '../styles/RackStyle.css';
import { RackProps } from '../containers/RackContainer'
import { Tile } from '../types/State' 

const Rack = (props: RackProps)  => {
  const {tiles} = props;
  const rackTiles = !tiles ? "" : tiles.map((tile: Tile, index: number) => (
    <div key={index} className="rackTile"><span>{tile.letter}</span></div>
  ));
  
  return (
  <div className="rack">
    {rackTiles} 
  </div>
  );
}

export default Rack;
