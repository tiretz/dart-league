import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';

import { Subscription } from 'rxjs';

import { ITokenUser } from '../../../../core/models/token-user.interface';
import { AuthService } from '../../../../core/services/auth.service';

import { SidenavLinkComponent } from './components/sidenav-link/sidenav-link.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, SidenavLinkComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  protected isUserLoggedIn: boolean = false;

  @Input({ required: true })
  sidenav!: MatSidenav;

  private userSubscription?: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe({
      next: (user: ITokenUser | undefined) => {
        this.isUserLoggedIn = !!user;
      },
    });
  }
}
