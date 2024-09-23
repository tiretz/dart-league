import { IHomeTeam } from './home-team.interface';

export interface ICreateHomePlayer {
  firstName: string;
  lastName: string;
  passnumber: string;
  teamIds: number[];
}

export interface IHomePlayer {
  id: number;
  firstName: string;
  lastName: string;
  passnumber: string;
  teams: IHomeTeam[];
}

export interface IPatchHomePlayer extends ICreateHomePlayer {
  id: number;
}
