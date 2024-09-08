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
  league: string;
  matchday: number;
  mode: string;
  stake: number;
}

export interface IGameInfoChange {
  guest_team_name?: string;
  home_team_id?: number;
  league?: string;
  matchday?: number;
  mode?: string;
  stake?: number;
}

export interface IGuestTeam extends IHomeTeam {}

export interface IHomeTeam extends IHomeTeamInfo {
  players: IPlayer[];
  score: number;
}

export interface IHomeTeamInfo {
  id: number;
  name: string;
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
