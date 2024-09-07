import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-numeric-setting',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './numeric-setting.component.html',
  styleUrl: './numeric-setting.component.scss',
})
export class NumericSettingComponent {
  @Input({ required: true })
  text!: string;

  @Input({ required: true })
  value!: number;
}
