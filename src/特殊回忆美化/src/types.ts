export type ModalType = 'none' | 'status' | 'system' | 'save' | 'load' | 'log';

export interface GameState {
  time: string;
  date: {
    era: string;
    season: string;
    day: number;
  };
  location: string;
  amberState: string;
  memoryPetals: number;
  echo: string;
}
