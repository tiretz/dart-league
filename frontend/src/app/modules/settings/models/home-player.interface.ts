import { IHomeTeam } from './home-team.interface';

export interface IHomePlayer {
  id: number;
  first_name: string;
  last_name: string;
  passnumber: string;
  teams: IHomeTeam[];
}
