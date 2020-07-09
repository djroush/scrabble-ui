import React from 'react';

import '../css/Rack.css';

type RackState = {
  letters: string[];
}

class Rack extends React.PureComponent<unknown, RackState> {
  constructor(props: unknown) {
    super(props);
  }

  render(): JSX.Element {
    
    const {letters} = this.state;
    
    const rackTiles = !letters ? "" : letters.map((letter: String, index: number) => (
      <div key={index} className="rackTile"><span>{letter}</span></div>
    ));
    
    return (
    <div className="rack">
      {rackTiles} 
    </div>
    );
  }
}

Rack.prototype.state = {
  letters: ['T','E','S','T','I','N','G'],
};

export default Rack;
