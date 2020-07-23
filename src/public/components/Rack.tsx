import React from 'react';

import '../css/Rack.css';
import { RackProps } from '../containers/Rack' 

const Rack = (props: RackProps)  => {
  const {letters} = props;
  const rackTiles = !letters ? "" : letters.map((letter: String, index: number) => (
    <div key={index} className="rackTile"><span>{letter}</span></div>
  ));
  
  return (
  <div className="rack">
    {rackTiles} 
  </div>
  );
}

export default Rack;

