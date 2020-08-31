import { GameStatus } from '../store/State';

export const getStatusName = (status: GameStatus): string => {
  switch(status) {
    case GameStatus.PENDING: {
      return 'PENDING';
    }
    case GameStatus.ABANDONED: {
      return 'ABANDONED';
    }
    case GameStatus.ACTIVE: {
      return 'ACTIVE';
    }
    case GameStatus.ENDGAME: {
      return 'ENDGAME';
    }
    case GameStatus.FINISHED: {
      return 'FINISHED';
    }
    case GameStatus.ABORTED: {
      return 'ABORTED';
    }
  }
  return 'UNKNOWN';
}

export const getStatus = (status: string): GameStatus => {
  switch(status) {
    case 'PENDING': {
      return GameStatus.PENDING;
    }
    case 'ABANDONED': {
      return GameStatus.ABANDONED;
    }
    case 'ACTIVE': {
      return GameStatus.ACTIVE;
    }
    case 'ENDGAME': {
      return GameStatus.ENDGAME;
    }
    case 'FINISHED': {
      return GameStatus.FINISHED;
    }
    case 'ABORTED': {
      return GameStatus.ABORTED;
    }
  }
  return GameStatus.UNKNOWN;
}
