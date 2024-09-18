import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IListItem } from '../../models/list-item';

@Component({
  selector: 'app-edit-item-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-item-dialog.component.html',
  styleUrl: './edit-item-dialog.component.scss',
})
export class EditItemDialogComponent implements OnInit {
  formGroup!: FormGroup;

  data: { itemName: string; itemToEdit: IListItem } = inject(MAT_DIALOG_DATA);

  constructor(private readonly dialogRef: MatDialogRef<EditItemDialogComponent>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      item: new FormControl(this.data.itemToEdit.name, { validators: [Validators.required] }),
    });
  }

  onSaveItem(): void {
    const editedItem: IListItem = {
      id: this.data.itemToEdit.id,
      name: this.formGroup.get('item')?.value,
      order_index: this.data.itemToEdit.order_index,
    };

    this.dialogRef.close(editedItem);
  }
}
