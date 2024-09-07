import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Subscription } from 'rxjs';

import { ITokenUser } from '../../core/models/token-user.interface';
import { AuthService } from '../../core/services/auth.service';

import { RunningGamesComponent } from './components/running-games/running-games.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, RunningGamesComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  protected isUserLoggedIn: boolean = false;

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
