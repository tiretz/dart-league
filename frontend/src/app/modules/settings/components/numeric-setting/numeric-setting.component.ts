import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-numeric-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './numeric-setting.component.html',
  styleUrl: './numeric-setting.component.scss',
})
export class NumericSettingComponent {
  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  @Input({ required: true })
  text!: string;

  @Input({ required: true })
  value!: number;

  onResetValue() {
    this.value = 0;
    this.valueChange.emit(0);
  }

  onValueChange(event: Event) {
    this.valueChange.emit(Number((event.target as HTMLInputElement).value));
  }
}
