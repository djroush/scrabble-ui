import { AppState } from '../store/State';

export const shuffleLetters = (appState: AppState) => {
  const letters: string[] = appState.rack.letters;
  let shuffledLetters = [];
  
  while (letters.length > 0) {
    const index: number = Math.floor(Math.random() * letters.length);
    const letter: string = letters.splice(index, 1)[0];
    shuffledLetters.push(letter);
  } 
  appState.rack.letters = shuffledLetters;
  
  return appState;
}