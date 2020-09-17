import React from 'react'
import { connect } from 'react-redux';

import { AppState, LastTurnState, PlayerInfo } from '../types/State';
import TurnView from '../views/LastTurnView';


type TurnStateProps = {
  lastTurn: LastTurnState;
  players: PlayerInfo[];
}; 
export type TurnProps = TurnStateProps

const mapStateToProps = (state: AppState) => ({
    lastTurn: state.lastTurn,
    players: state.players,
})

const Turn = (props: TurnProps) => {
  return (
    <TurnView {...props} />
  );
}

export default connect(mapStateToProps)(Turn)

