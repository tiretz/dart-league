import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Observable } from 'rxjs';

import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-misc',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, OverlayComponent],
  templateUrl: './misc.component.html',
  styleUrl: './misc.component.scss',
})
export class MiscComponent {
  protected isLoading$?: Observable<boolean>;

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isLoading$ = this.settingsService.miscLoading$;
  }
}
