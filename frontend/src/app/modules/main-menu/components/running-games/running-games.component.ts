import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { IGameInfo } from '../../models/game-info.interface';

@Component({
  selector: 'app-running-games',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './running-games.component.html',
  styleUrl: './running-games.component.scss',
})
export class RunningGamesComponent {
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
}
