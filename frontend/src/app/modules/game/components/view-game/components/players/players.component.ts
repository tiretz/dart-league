import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IPlayer } from '../../../../models/game.interface';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  @Input({ required: true })
  players?: IPlayer[];
}
