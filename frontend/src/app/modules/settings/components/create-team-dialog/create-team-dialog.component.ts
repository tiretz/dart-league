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

import { League } from '../../../../core/models/league.enum';

import { ICreateHomeTeam } from '../../models/create-home-team.interface';

@Component({
  selector: 'app-create-team-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.scss',
})
export class CreateTeamDialogComponent {
  formGroup!: FormGroup;
  leagues?: League[] = Object.values(League);

  constructor(private readonly dialogRef: MatDialogRef<CreateTeamDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required] }),
      league: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onCreateTeam(): void {
    const newTeam: ICreateHomeTeam = {
      name: this.formGroup.get('name')?.value,
      league: this.formGroup.get('league')?.value,
    };

    this.dialogRef.close(newTeam);
  }
}
