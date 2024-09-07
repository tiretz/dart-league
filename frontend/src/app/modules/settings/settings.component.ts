import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { HomePlayersComponent } from './components/home-players/home-players.component';
import { HomeTeamComponent } from './components/home-team/home-team.component';
import { MiscComponent } from './components/misc/misc.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, HomeTeamComponent, HomePlayersComponent, MiscComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
