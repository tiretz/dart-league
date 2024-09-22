import { IHomeTeam } from './home-team.interface';

export interface ICreateHomePlayer {
  first_name: string;
  last_name: string;
  passnumber: string;
  teams: IHomeTeam[];
}

export interface IHomePlayer extends IPatchHomePlayer {
  id: number;
}

export interface IPatchHomePlayer extends ICreateHomePlayer {}
