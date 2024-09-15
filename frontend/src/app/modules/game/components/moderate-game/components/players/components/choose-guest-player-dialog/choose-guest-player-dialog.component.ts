import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IPlayer } from '../../../../../../models/game.interface';

@Component({
  selector: 'app-choose-guest-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './choose-guest-player-dialog.component.html',
  styleUrl: './choose-guest-player-dialog.component.scss',
})
export class ChooseGuestPlayerDialogComponent implements OnInit {
  formGroup!: FormGroup;

  data: { selectedPlayer: IPlayer | undefined } = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<ChooseGuestPlayerDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.data.selectedPlayer?.first_name, { validators: [Validators.required] }),
      lastName: new FormControl(this.data.selectedPlayer?.last_name, { validators: [Validators.required] }),
      passnumber: new FormControl(this.data.selectedPlayer?.passnumber, { validators: [Validators.required] }),
    });
  }

  onSelectPlayer(): void {
    const selectedPlayer: { first_name: string; last_name: string; passnumber: string } = {
      first_name: this.formGroup.get('firstName')?.value,
      last_name: this.formGroup.get('lastName')?.value,
      passnumber: this.formGroup.get('passnumber')?.value,
    };

    this.dialogRef.close(selectedPlayer);
  }
}
