import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { MatTableSortingCacheDirective } from '../../../../../../shared/directives/mat-table-sorting-cache.directive';

import { IDoubleGame, IGame, ISingleGame } from '../../../../models/game.interface';

@Component({
  selector: 'app-games-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatTableModule, MatSortModule, MatTableSortingCacheDirective],
  templateUrl: './games-table.component.html',
  styleUrl: './games-table.component.scss',
})
export class GamesTableComponent {
  protected columns: {
    columnDef: string;
    header: string;
    cell: (element: ISingleGame | IDoubleGame) => string;
  }[] = [
    {
      columnDef: 'index',
      header: 'Spiel',
      cell: (element: ISingleGame | IDoubleGame) => `${element.index + 1}`,
    },
    {
      columnDef: 'homePlayerNumber',
      header: 'Heim',
      cell: (element: ISingleGame | IDoubleGame) => `H${element.home_player_index + 1}`,
    },
    {
      columnDef: 'homePlayerName',
      header: 'Name',
      cell: (element: ISingleGame | IDoubleGame) => `${this.game?.home_team.players[element.home_player_index].first_name} ${this.game?.home_team.players[element.home_player_index].last_name}`,
    },
    {
      columnDef: 'guestPlayerNumber',
      header: 'Gast',
      cell: (element: ISingleGame | IDoubleGame) => `G${element.guest_player_index + 1}`,
    },
    {
      columnDef: 'guestPlayerName',
      header: 'Name',
      cell: (element: ISingleGame | IDoubleGame) => `${this.game?.guest_team.players[element.guest_player_index].first_name} ${this.game?.guest_team.players[element.guest_player_index].last_name}`,
    },
    {
      columnDef: 'legs',
      header: 'Legs',
      cell: (element: ISingleGame | IDoubleGame) => `${element.leg_score.home} : ${element.leg_score.guest}`,
    },
    {
      columnDef: 'points',
      header: 'Punkte',
      cell: (element: ISingleGame | IDoubleGame) => `${element.point_score.home} : ${element.point_score.guest}`,
    },
    {
      columnDef: 'rank',
      header: 'Rang',
      cell: (element: ISingleGame | IDoubleGame) => `${element.rank_score.home} : ${element.rank_score.guest}`,
    },
  ];
  protected dataSource: MatTableDataSource<ISingleGame | IDoubleGame> = new MatTableDataSource<ISingleGame | IDoubleGame>();
  protected displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @Input({ required: true })
  game?: IGame;

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  @Input({ required: true })
  sortingCacheId!: string;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: ISingleGame | IDoubleGame, property: string) => {
      switch (property) {
        case 'homePlayerNumber':
          return item.home_player_index;

        case 'homePlayerName':
          return this.game?.home_team.players[item.home_player_index].last_name;

        case 'guestPlayerNumber':
          return item.guest_player_index;

        case 'guestPlayerName':
          return this.game?.guest_team.players[item.guest_player_index].last_name;

        case 'legs':
          return item.leg_score.home;

        case 'points':
          return item.point_score.home;

        case 'rank':
          return item.rank_score.home;

        default:
          return (item as any)[property];
      }
    };

    this.dataSource.data = [...(this.game?.games.singles ?? []), ...(this.game?.games.doubles ?? [])];
  }
}
