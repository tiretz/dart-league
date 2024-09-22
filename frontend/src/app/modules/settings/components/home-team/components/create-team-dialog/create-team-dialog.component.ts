import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ILeague } from '../../../../../../core/models/league.interface';

import { ICreateHomeTeam } from '../../../../models/home-team.interface';

import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-create-team-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.scss',
})
export class CreateTeamDialogComponent {
  formGroup!: FormGroup;
  leagues?: ILeague[];

  constructor(private readonly dialogRef: MatDialogRef<CreateTeamDialogComponent>, private readonly formBuilder: FormBuilder, private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required] }),
      league: new FormControl('', { validators: [Validators.required] }),
    });

    this.settingsService.getLeagues().subscribe({
      next: (leagues: ILeague[]) => {
        this.leagues = leagues;
      },
    });
  }

  onCreateTeam(): void {
    const newTeam: ICreateHomeTeam = {
      name: this.formGroup.get('name')?.value,
      leagueId: this.formGroup.get('league')?.value,
    };

    this.dialogRef.close(newTeam);
  }
}
