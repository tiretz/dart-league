import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { League } from '../../../../core/models/league.enum';
import { GameMode } from '../../../../core/models/game-mode.enum';

import { IGame } from '../../models/game.interface';

import { GameInfoComponent } from './components/game-info/game-info.component';
import { PlayersComponent } from './components/players/players.component';

@Component({
  selector: 'app-view-game',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, GameInfoComponent, PlayersComponent],
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss',
})
export class ViewGameComponent {
  game?: IGame = {
    guest_team: {
      name: 'Gast',
      players: [
        { first_name: 'Gast', last_name: '1', passnumber: '123456789', rlp: 5, stake: 1 },
        { first_name: 'Gast', last_name: '2', passnumber: '123456789', rlp: 3, stake: 1.5 },
        { first_name: 'Gast', last_name: '3', passnumber: '123456789', rlp: 7, stake: 2 },
        { first_name: 'Gast', last_name: '4', passnumber: '123456789', rlp: 1, stake: 0.5 },
        { first_name: 'Gast', last_name: '5', passnumber: '123456789', rlp: 2, stake: 1 },
      ],
      score: 3,
    },
    home_team: {
      name: 'Home',
      players: [
        { first_name: 'Home', last_name: '1', passnumber: '123456789', rlp: 5, stake: 1 },
        { first_name: 'Home', last_name: '2', passnumber: '123456789', rlp: 3, stake: 1.5 },
        { first_name: 'Home', last_name: '3', passnumber: '123456789', rlp: 7, stake: 2 },
        { first_name: 'Home', last_name: '4', passnumber: '123456789', rlp: 1, stake: 0.5 },
        { first_name: 'Home', last_name: '5', passnumber: '123456789', rlp: 2, stake: 1 },
      ],
      score: 5,
    },
    info: {
      league: League.BZ,
      matchday: 6,
      mode: GameMode.SingleOut,
      stake: 3,
    },
  };
}
