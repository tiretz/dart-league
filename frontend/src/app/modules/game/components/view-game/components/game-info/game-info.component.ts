import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { IGameInfo } from '../../../../models/game.interface';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent implements OnInit {
  protected columns: {
    columnDef: string;
    header: string;
    cell: (element: IGameInfo) => string;
  }[] = [
    {
      columnDef: 'matchday',
      header: 'Spieltag',
      cell: (element: IGameInfo) => `${element.matchday}`,
    },
    {
      columnDef: 'league',
      header: 'Spielklasse',
      cell: (element: IGameInfo) => `${element.league}`,
    },
    {
      columnDef: 'mode',
      header: 'Spielmodus',
      cell: (element: IGameInfo) => `${element.mode}`,
    },
    {
      columnDef: 'stake',
      header: 'Stake',
      cell: (element: IGameInfo) => `${element.stake.toFixed(2)} €`,
    },
  ];
  protected dataSource: MatTableDataSource<IGameInfo | undefined> = new MatTableDataSource<IGameInfo | undefined>();
  protected displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @Input({ required: true })
  info?: IGameInfo;

  ngOnInit(): void {
    this.dataSource.data = [this.info];
  }
}
