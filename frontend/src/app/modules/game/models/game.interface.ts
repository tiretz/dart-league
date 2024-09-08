import { GameMode } from '../../../core/models/game-mode.enum';
import { League } from '../../../core/models/league.enum';

export interface IDoubleGame extends ISingleGame {
  show_score: boolean;
}

export interface IGame {
  games: IGames;
  guest_team: IGuestTeam;
  home_team: IHomeTeam;
  info: IGameInfo;
}

export interface IGames {
  singles: ISingleGame[];
  doubles: IDoubleGame[];
}

export interface IGameInfo {
  league: League;
  matchday: number;
  mode: GameMode;
  stake: number;
}

interface IGuestTeam extends IHomeTeam {}

interface IHomeTeam {
  id: number;
  name: string;
  players: IPlayer[];
  score: number;
}

export interface IPlayer {
  first_name: string;
  id: number;
  last_name: string;
  passnumber: string;
  rlp: number;
  stake: number;
}

export interface ISingleGame {
  index: number;
  home_player_index: number;
  guest_player_index: number;
  leg_score: {
    home: number;
    guest: number;
  };
  point_score: {
    home: number;
    guest: number;
  };
  rank_score: {
    home: number;
    guest: number;
  };
}
