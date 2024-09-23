import { Pipe, PipeTransform } from '@angular/core';

import { IHomeTeam } from '../../modules/settings/models/home-team.interface';

@Pipe({
  name: 'teamsToCommaList',
  standalone: true,
})
export class TeamsToCommaListPipe implements PipeTransform {
  transform(teams: IHomeTeam[]): unknown {
    return teams.map((t) => t.name).join(', ');
  }
}
