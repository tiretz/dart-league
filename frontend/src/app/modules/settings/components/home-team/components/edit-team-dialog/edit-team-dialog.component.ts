import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ILeague } from '../../../../../../core/models/league.interface';

import { IPatchHomeTeam } from '../../../../models/home-team.interface';
import { IHomeTeam } from '../../../../models/home-team.interface';

import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-edit-team-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-team-dialog.component.html',
  styleUrl: './edit-team-dialog.component.scss',
})
export class EditTeamDialogComponent {
  formGroup!: FormGroup;
  leagues?: ILeague[];

  team: IHomeTeam = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<EditTeamDialogComponent>, private readonly formBuilder: FormBuilder, private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.team.name, { validators: [Validators.required] }),
      league: new FormControl(this.team.league.id, { validators: [Validators.required] }),
    });

    this.settingsService.getLeagues().subscribe({
      next: (leagues: ILeague[]) => {
        this.leagues = leagues;
      },
    });
  }

  onSaveTeam(): void {
    const editedTeam: IPatchHomeTeam = {
      id: this.team.id,
      name: this.formGroup.get('name')?.value,
      leagueId: this.formGroup.get('league')?.value,
    };

    this.dialogRef.close(editedTeam);
  }
}
