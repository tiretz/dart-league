import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-link',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './sidenav-link.component.html',
  styleUrl: './sidenav-link.component.scss',
})
export class SidenavLinkComponent {
  @Input({ required: true })
  icon!: string;

  @Input({ required: true })
  routerLink!: string;

  @Input({ required: false })
  routerLinkActiveOptions: { exact: boolean } = { exact: false };

  @Input({ required: true })
  text!: string;
}
