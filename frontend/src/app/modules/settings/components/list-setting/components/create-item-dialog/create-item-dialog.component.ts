import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-item-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-item-dialog.component.html',
  styleUrl: './create-item-dialog.component.scss',
})
export class CreateItemDialogComponent {
  formGroup!: FormGroup;

  itemName: string = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<CreateItemDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      item: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onCreateItem(): void {
    const newItem: string = this.formGroup.get('item')?.value;

    this.dialogRef.close(newItem);
  }
}
