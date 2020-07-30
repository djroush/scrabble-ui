import React from 'react';

import '../css/Exchange.css';
import { ExchangeProps } from '../containers/Exchange' 

const Rack = (props: ExchangeProps)  => {
  const {letters, onKeyPress} = props;
  const exchangeTiles = !letters ? "" : letters.map((letter: String, index: number) => (
    <div key={index} className="exchangeTile" data-index={index} data-letter={letter}><span>{letter}</span></div>
  ));
  
  return (
  <div tabIndex={300} className="exchange" onKeyPress={onKeyPress}>
    {exchangeTiles} 
  </div>
  );
}

export default Rack;
