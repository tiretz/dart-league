import { League } from '../../../core/models/league.enum';

export interface IHomeTeam {
  id: number;
  name: string;
  league: League;
  number_of_players: number;
}
