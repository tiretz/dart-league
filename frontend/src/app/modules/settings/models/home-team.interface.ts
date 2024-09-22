export interface ICreateHomeTeam {
  name: string;
  league: string;
}

export interface IHomeTeam extends IPatchHomeTeam {
  id: number;
  number_of_players: number;
}

export interface IPatchHomeTeam extends ICreateHomeTeam {}
