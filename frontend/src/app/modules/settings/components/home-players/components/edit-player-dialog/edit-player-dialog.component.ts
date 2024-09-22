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

  constructor(private readonly dialogRef: MatDialogRef<EditPlayerDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.player.first_name, { validators: [Validators.required] }),
      lastName: new FormControl(this.player.last_name, { validators: [Validators.required] }),
      passnumber: new FormControl(this.player.passnumber, { validators: [Validators.required] }),
      teams: new FormControl(
        this.player.teams.map((team) => team.id),
        { validators: [Validators.required] }
      ),
    });
  }

  onSavePlayer(): void {
    const editedPlayer: IPatchHomePlayer = {
      first_name: this.formGroup.get('firstName')?.value,
      last_name: this.formGroup.get('lastName')?.value,
      passnumber: this.formGroup.get('passnumber')?.value,
      teams: this.formGroup.get('teams')?.value,
    };

    this.dialogRef.close(editedPlayer);
  }
}
