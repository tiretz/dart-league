import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent {
  @Input({ required: true })
  isVisible!: boolean | null;

  @Input({ required: true })
  message!: string;
}
