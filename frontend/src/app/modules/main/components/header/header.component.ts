import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';

import { Subscription } from 'rxjs';

import { TitleService } from '../../../../core/services/title.service';

import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, UserInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy, OnInit {
  @Input({ required: true })
  sidenav!: MatSidenav;

  protected title?: string;

  private titleSubscription?: Subscription;

  constructor(private readonly titleService: TitleService) {}

  ngOnDestroy(): void {
    this.titleSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.titleSubscription = this.titleService.title$.subscribe({
      next: (title: string) => {
        this.title = title;
      },
    });
  }
}
