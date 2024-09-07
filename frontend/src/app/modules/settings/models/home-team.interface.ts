import { League } from './league.enum';

export interface IHomeTeam {
  id: number;
  name: string;
  league: League;
  number_of_players: number;
}
