import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Observable } from 'rxjs';

import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';

import { SettingsService } from '../../services/settings.service';

import { NumericSettingComponent } from '../numeric-setting/numeric-setting.component';
import { IMiscSettings } from '../../models/misc-settings.interface';

@Component({
  selector: 'app-misc-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, OverlayComponent, NumericSettingComponent],
  templateUrl: './misc-settings.component.html',
  styleUrl: './misc-settings.component.scss',
})
export class MiscSettingsComponent {
  protected isLoading$?: Observable<boolean>;
  protected settings?: IMiscSettings;

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isLoading$ = this.settingsService.miscSettingsLoading$;
  }

  getMiscSettings(): void {
    this.settingsService.getMiscSettings().subscribe({
      next: (miscSettings: IMiscSettings) => {
        this.settings = miscSettings;
      },
    });
  }

  onStakeValueChange(stake: number): void {
    this.settingsService.patchMiscSettings({ stake }).subscribe({
      next: (miscSettings: IMiscSettings) => {
        this.settings = miscSettings;
      },
    });
  }
}
