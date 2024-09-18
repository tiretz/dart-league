import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { Observable } from 'rxjs';

import { ILeague } from '../../core/models/league.interface';
import { IMode } from '../../core/models/mode.interface';

import { HomePlayersComponent } from './components/home-players/home-players.component';
import { HomeTeamComponent } from './components/home-team/home-team.component';
import { ListSettingComponent } from './components/list-setting/list-setting.component';
import { MiscComponent } from './components/misc/misc.component';

import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, HomeTeamComponent, HomePlayersComponent, MiscComponent, ListSettingComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  protected leagues?: ILeague[];
  protected leaguesLoading$?: Observable<boolean>;
  protected modes?: IMode[];
  protected modesLoading$?: Observable<boolean>;

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.leaguesLoading$ = this.settingsService.leaguesLoading$;
    this.modesLoading$ = this.settingsService.modesLoading$;

    this.getLeagues();
    this.getModes();
  }

  getLeagues(): void {
    this.settingsService.getLeagues().subscribe({
      next: (leagues: ILeague[]) => {
        this.leagues = leagues;
      },
    });
  }

  getModes(): void {
    this.settingsService.getModes().subscribe({
      next: (modes: IMode[]) => {
        this.modes = modes;
      },
    });
  }
}
