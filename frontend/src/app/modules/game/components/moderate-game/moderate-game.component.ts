import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { IGame } from '../../models/game.interface';

import { GameInfoComponent } from './components/game-info/game-info.component';
import { GamesTableComponent } from './components/games-table/games-table.component';
import { PlayersComponent } from './components/players/players.component';

@Component({
  selector: 'app-moderate-game',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, GameInfoComponent, PlayersComponent, GamesTableComponent],
  templateUrl: './moderate-game.component.html',
  styleUrl: './moderate-game.component.scss',
})
export class ModerateGameComponent {
  game?: IGame = {
    guest_team: {
      id: 1,
      name: 'Gast',
      players: [
        { first_name: 'Gast', id: 1, last_name: '1', passnumber: '123456789', rlp: 5, stake: 1 },
        { first_name: 'Gast', id: 2, last_name: '2', passnumber: '123456789', rlp: 3, stake: 1.5 },
        { first_name: 'Gast', id: 3, last_name: '3', passnumber: '123456789', rlp: 7, stake: 2 },
        { first_name: 'Gast', id: 4, last_name: '4', passnumber: '123456789', rlp: 1, stake: 0.5 },
        { first_name: 'Gast', id: 5, last_name: '5', passnumber: '123456789', rlp: 2, stake: 1 },
      ],
      score: 3,
    },
    home_team: {
      id: 0,
      name: 'Home',
      players: [
        { first_name: 'Home', id: 6, last_name: '1', passnumber: '123456789', rlp: 5, stake: 1 },
        { first_name: 'Home', id: 7, last_name: '2', passnumber: '123456789', rlp: 3, stake: 1.5 },
        { first_name: 'Home', id: 8, last_name: '3', passnumber: '123456789', rlp: 7, stake: 2 },
        { first_name: 'Home', id: 9, last_name: '4', passnumber: '123456789', rlp: 1, stake: 0.5 },
        { first_name: 'Home', id: 10, last_name: '5', passnumber: '123456789', rlp: 2, stake: 1 },
      ],
      score: 5,
    },
    info: {
      league: 'BZ',
      matchday: 6,
      mode: '501SO',
      stake: 3,
    },
    games: {
      doubles: [],
      singles: [
        { guest_player_index: 0, home_player_index: 0, index: 0, leg_score: { guest: 1, home: 2 }, point_score: { guest: 1, home: 2 }, rank_score: { guest: 1, home: 2 } },
        { guest_player_index: 1, home_player_index: 1, index: 1, leg_score: { guest: 2, home: 1 }, point_score: { guest: 2, home: 1 }, rank_score: { guest: 2, home: 1 } },
      ],
    },
  };
}
