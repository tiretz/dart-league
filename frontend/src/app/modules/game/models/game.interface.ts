import { GameMode } from '../../../core/models/game-mode.enum';
import { League } from '../../../core/models/league.enum';

export interface IGame {
  guest_team: IGuestTeam;
  home_team: IHomeTeam;
  info: IGameInfo;
}

export interface IGameInfo {
  league: League;
  matchday: number;
  mode: GameMode;
  stake: number;
}

interface IGuestTeam extends IHomeTeam {}

interface IHomeTeam {
  name: string;
  players: IPlayer[];
  score: number;
}

export interface IPlayer {
  first_name: string;
  last_name: string;
  passnumber: string;
  rlp: number;
  stake: number;
}
