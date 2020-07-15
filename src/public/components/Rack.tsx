import React from 'react';

import '../css/Rack.css';

type RackProps = {
  letters: string[], 
}


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

Rack.defaultProps = {
  letters: ['T','E','S','T','I','N','G'] 
}

export default Rack;
