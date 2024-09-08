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

import { League } from '../../../../core/models/league.enum';

import { IEditHomeTeam } from '../../models/edit-home-team.interface';
import { IHomeTeam } from '../../models/home-team.interface';

import { CreateTeamDialogComponent } from '../create-team-dialog/create-team-dialog.component';

@Component({
  selector: 'app-edit-team-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './edit-team-dialog.component.html',
  styleUrl: './edit-team-dialog.component.scss',
})
export class EditTeamDialogComponent {
  formGroup!: FormGroup;
  leagues?: League[] = Object.values(League);

  team: IHomeTeam = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<CreateTeamDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.team.name, { validators: [Validators.required] }),
      league: new FormControl(this.team.league, { validators: [Validators.required] }),
    });
  }

  onSaveTeam(): void {
    const editedTeam: IEditHomeTeam = {
      name: this.formGroup.get('name')?.value,
      league: this.formGroup.get('league')?.value,
    };

    this.dialogRef.close(editedTeam);
  }
}