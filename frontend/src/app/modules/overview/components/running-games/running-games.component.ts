import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable, Subscription } from 'rxjs';

import { ITokenUser } from '../../../../core/models/token-user.interface';
import { AuthService } from '../../../../core/services/auth.service';

import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { MatTableSortingCacheDirective } from '../../../../shared/directives/mat-table-sorting-cache.directive';

import { IGameInfo } from '../../models/game-info.interface';

import { OverviewService } from '../../services/overview.service';

@Component({
  selector: 'app-running-games',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatTooltipModule, OverlayComponent, MatTableSortingCacheDirective],
  templateUrl: './running-games.component.html',
  styleUrl: './running-games.component.scss',
})
export class RunningGamesComponent implements OnDestroy, OnInit {
  protected columns = [
    {
      columnDef: 'indicator',
      header: '',
      cell: (element: IGameInfo) => '',
    },
    {
      columnDef: 'id',
      header: 'Nr.',
      cell: (element: IGameInfo) => `${element.id}`,
    },
    {
      columnDef: 'homeTeam',
      header: 'Heimmannschaft',
      cell: (element: IGameInfo) => `${element.home_team.name}`,
    },
    {
      columnDef: 'guestTeam',
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

  constructor(private readonly authService: AuthService, private readonly overviewService: OverviewService) {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading$ = this.overviewService.runningGamesLoading$;

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
    this.dataSource.sortingDataAccessor = (item: IGameInfo, property: string) => {
      switch (property) {
        case 'homeTeam':
          return item.home_team.name;

        case 'guestTeam':
          return item.guest_team.name;

        case 'score':
          return item.home_team.score;

        default:
          return (item as any)[property];
      }
    };

    this.dataSource.data = [
      { guest_team: { name: 'Guest', score: 1 }, home_team: { name: 'Home', score: 2 }, id: 1 },
      { guest_team: { name: 'Guest 2', score: 2 }, home_team: { name: 'Home 2', score: 3 }, id: 2 },
    ];
  }
}
