import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';

import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';

import { IGameInfo } from '../../models/game-info.interface';

import { MainMenuService } from '../../services/main-menu.service';
import { ITokenUser } from '../../../../core/models/token-user.interface';

@Component({
  selector: 'app-running-games',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatTooltipModule, OverlayComponent],
  templateUrl: './running-games.component.html',
  styleUrl: './running-games.component.scss',
})
export class RunningGamesComponent implements OnDestroy, OnInit {
  protected columns = [
    {
      columnDef: 'id',
      header: 'Nr.',
      cell: (element: IGameInfo) => `${element.id}`,
    },
    {
      columnDef: 'home_team',
      header: 'Heimmannschaft',
      cell: (element: IGameInfo) => `${element.home_team.name}`,
    },
    {
      columnDef: 'guest_team',
      header: 'Gastmannschaft',
      cell: (element: IGameInfo) => `${element.guest_team.name}`,
    },
    {
      columnDef: 'score',
      header: 'Spielstand',
      cell: (element: IGameInfo) => `${element.home_team.score} : ${element.guest_team.score}`,
    },
  ];
  protected dataSource = new MatTableDataSource<IGameInfo>();
  protected displayedColumns = this.columns.map((c) => c.columnDef);

  protected isLoading$?: Observable<boolean>;

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  private userSubscription?: Subscription;

  constructor(private readonly authService: AuthService, private readonly mainMenuService: MainMenuService) {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading$ = this.mainMenuService.runningGamesLoading$;

    this.userSubscription = this.authService.user$.subscribe({
      next: (user: ITokenUser | undefined) => {
        const hasActionsColumn: boolean = this.columns.some((column) => column.columnDef == 'actions');

        if (user && !hasActionsColumn) {
          this.columns.push({
            columnDef: 'actions',
            header: '',
            cell: (element: IGameInfo) => '',
          });
        } else if (!user && hasActionsColumn) {
          this.columns.pop();
        }

        this.displayedColumns = this.columns.map((c) => c.columnDef);
      },
    });

    this.dataSource.sort = this.sort;
  }
}
