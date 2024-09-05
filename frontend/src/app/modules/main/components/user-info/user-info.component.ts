import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Subscription } from 'rxjs';

import { ITokenUser } from '../../../../core/models/token-user.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnDestroy, OnInit {
  protected user?: ITokenUser;

  private userSubscription?: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe({
      next: (user?: ITokenUser) => {
        this.user = user;
      },
    });
  }

  async onLogin(): Promise<void> {
    await this.authService.login();
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
