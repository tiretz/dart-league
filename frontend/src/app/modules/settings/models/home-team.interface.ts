import { ILeague } from '../../../core/models/league.interface';

export interface ICreateHomeTeam {
  name: string;
  leagueId: number;
}

export interface IHomeTeam {
  id: number;
  name: string;
  league: ILeague;
  numberOfPlayers: number;
}

export interface IPatchHomeTeam extends ICreateHomeTeam {
  id: number;
}
