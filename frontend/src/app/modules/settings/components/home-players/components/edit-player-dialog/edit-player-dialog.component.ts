import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { IPatchHomePlayer } from '../../../../models/home-player.interface';
import { IHomePlayer } from '../../../../models/home-player.interface';
import { IHomeTeam } from '../../../../models/home-team.interface';

import { HomeTeamService } from '../../../../services/home-team.service';

@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './edit-player-dialog.component.html',
  styleUrl: './edit-player-dialog.component.scss',
})
export class EditPlayerDialogComponent {
  player: IHomePlayer = inject(MAT_DIALOG_DATA);

  formGroup!: FormGroup;
  homeTeams?: IHomeTeam[];

  constructor(private readonly dialogRef: MatDialogRef<EditPlayerDialogComponent>, private readonly formBuilder: FormBuilder, private readonly homeTeamService: HomeTeamService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.player.firstName, { validators: [Validators.required] }),
      lastName: new FormControl(this.player.lastName, { validators: [Validators.required] }),
      passnumber: new FormControl(this.player.passnumber, { validators: [Validators.required] }),
      teams: new FormControl(
        this.player.teams.map((team) => team.id),
        { validators: [Validators.required] }
      ),
    });

    this.homeTeamService.getHomeTeams().subscribe({
      next: (homeTeams: IHomeTeam[]) => {
        this.homeTeams = homeTeams;
      },
    });
  }

  onSavePlayer(): void {
    const editedPlayer: IPatchHomePlayer = {
      id: this.player.id,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      passnumber: this.formGroup.get('passnumber')?.value,
      teamIds: this.formGroup.get('teams')?.value,
    };

    this.dialogRef.close(editedPlayer);
  }
}
