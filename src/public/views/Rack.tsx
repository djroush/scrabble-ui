import React from 'react';

import '../css/Rack.css';
import { RackProps } from '../containers/Rack'
import { Tile } from '../store/State' 

const Rack = (props: RackProps)  => {
  const {tiles} = props;
  const rackTiles = !tiles ? "" : tiles.map((tile: Tile, index: number) => (
    <div key={index} className="rackTile"><span><div>{tile.letter}</div></span></div>
  ));
  
  return (
  <div className="rack">
    {rackTiles} 
  </div>
  );
}

export default Rack;

