import { ITeamInfo } from './team-info.interface';

export interface IGameInfo {
  home_team: ITeamInfo;
  id: number;
  guest_team: ITeamInfo;
}
