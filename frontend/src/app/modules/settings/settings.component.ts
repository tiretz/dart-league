import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { Observable } from 'rxjs';

import { ILeague } from '../../core/models/league.interface';
import { IMode } from '../../core/models/mode.interface';

import { HomePlayersComponent } from './components/home-players/home-players.component';
import { HomeTeamComponent } from './components/home-team/home-team.component';
import { ListSettingComponent } from './components/list-setting/list-setting.component';
import { MiscSettingsComponent } from './components/misc-settings/misc-settings.component';

import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, HomeTeamComponent, HomePlayersComponent, MiscSettingsComponent, ListSettingComponent],
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

  onCreateLeague(name: string): void {
    this.settingsService.createLeague(name).subscribe({
      next: (createdLeague: ILeague) => {
        this.getLeagues();
      },
    });
  }

  onCreateMode(name: string): void {
    this.settingsService.createMode(name).subscribe({
      next: (createdMode: IMode) => {
        this.getModes();
      },
    });
  }

  onDeleteLeague(league: ILeague): void {
    this.settingsService.deleteLeague(league.id).subscribe({
      next: (deletedLeague: ILeague) => {
        this.getLeagues();
      },
    });
  }

  onDeleteMode(mode: IMode): void {
    this.settingsService.deleteMode(mode.id).subscribe({
      next: (deletedMode: IMode) => {
        this.getModes();
      },
    });
  }

  onEditLeague(league: ILeague): void {
    this.settingsService.patchLeague(league).subscribe({
      next: (editedLeague: ILeague) => {
        this.getLeagues();
      },
    });
  }

  onEditMode(mode: IMode): void {
    this.settingsService.patchMode(mode).subscribe({
      next: (editedMode: IMode) => {
        this.getModes();
      },
    });
  }

  onReorderLeagues(leagues: ILeague[]): void {
    this.settingsService.reorderLeagues(leagues).subscribe({
      next: (reorderedLeagues: ILeague[]) => {
        this.leagues = reorderedLeagues;
      },
    });
  }

  onReorderModes(modes: IMode[]): void {
    this.settingsService.reorderModes(modes).subscribe({
      next: (reorderedModes: IMode[]) => {
        this.modes = reorderedModes;
      },
    });
  }
}
