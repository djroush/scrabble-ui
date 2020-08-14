import { GameStatus } from '../store/State';

export const getStatusName = (status: GameStatus): string => {
  switch(status) {
    case GameStatus.UNKNOWN: {
      return 'UNKNOWN';
    }
    case GameStatus.PENDING: {
      return 'PENDING';
    }
    case GameStatus.ACTIVE: {
      return 'ACTIVE';
    }
  }
  return  "UNKNOWN";
}

export const getStatus = (status: string): GameStatus => {
  switch(status) {
    case 'UNKNOWN': {
      return GameStatus.UNKNOWN;
    }
    case 'PENDING': {
      return GameStatus.PENDING;
    }
    case 'ACTIVE': {
      return GameStatus.ACTIVE;
    }
  }
  return  GameStatus.UNKNOWN;
}
