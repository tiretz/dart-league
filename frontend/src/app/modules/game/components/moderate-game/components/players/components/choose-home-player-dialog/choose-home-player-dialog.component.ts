import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { IPlayer } from '../../../../../../models/game.interface';

@Component({
  selector: 'app-choose-home-player-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './choose-home-player-dialog.component.html',
  styleUrl: './choose-home-player-dialog.component.scss',
})
export class ChooseHomePlayerDialogComponent implements OnInit {
  formGroup!: FormGroup;

  data: { selectedPlayer: IPlayer | undefined; selectablePlayers: IPlayer[] } = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<ChooseHomePlayerDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      player: new FormControl(this.data.selectedPlayer?.id, { validators: [Validators.required] }),
    });
  }

  onSelectedPlayer(): void {
    const selectedPlayer: IPlayer = this.formGroup.get('player')?.value;

    this.dialogRef.close(selectedPlayer);
  }
}
