import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { League } from '../../../../core/models/league.enum';

import { ICreateHomePlayer } from '../../models/create-home-player.interface';
import { IHomeTeam } from '../../models/home-team.interface';

@Component({
  selector: 'app-create-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './create-player-dialog.component.html',
  styleUrl: './create-player-dialog.component.scss',
})
export class CreatePlayerDialogComponent implements OnInit {
  formGroup!: FormGroup;
  homeTeams?: IHomeTeam[];

  constructor(private readonly dialogRef: MatDialogRef<CreatePlayerDialogComponent>, private readonly formBuilder: FormBuilder) {
    this.homeTeams = [
      { id: 1, league: League.A1, name: 'Test', number_of_players: 5 },
      { id: 2, league: League.B2, name: 'Test 2', number_of_players: 1 },
    ];
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      passnumber: new FormControl('', { validators: [Validators.required] }),
      teams: new FormControl([], { validators: [Validators.required] }),
    });
  }

  onCreatePlayer(): void {
    const newPlayer: ICreateHomePlayer = {
      first_name: this.formGroup.get('firstName')?.value,
      last_name: this.formGroup.get('lastName')?.value,
      passnumber: this.formGroup.get('passnumber')?.value,
      teams: this.formGroup.get('teams')?.value,
    };

    this.dialogRef.close(newPlayer);
  }
}
