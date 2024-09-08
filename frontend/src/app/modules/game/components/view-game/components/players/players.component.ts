import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatTableSortingCacheDirective } from '../../../../../../shared/directives/mat-table-sorting-cache.directive';

import { IPlayer } from '../../../../models/game.interface';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatTableModule, MatSortModule, MatTableSortingCacheDirective],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent implements OnInit {
  protected columns: {
    columnDef: string;
    header: string;
    cell: (element: IPlayer, index?: number) => string;
  }[] = [
    {
      columnDef: 'index',
      header: 'Nr.',
      cell: (element: IPlayer, index?: number) => `${index}`,
    },
    {
      columnDef: 'firstName',
      header: 'Vorname',
      cell: (element: IPlayer) => `${element.first_name}`,
    },
    {
      columnDef: 'lastName',
      header: 'Nachname',
      cell: (element: IPlayer) => `${element.last_name}`,
    },
    {
      columnDef: 'passnumber',
      header: 'Passnummer',
      cell: (element: IPlayer) => `${element.passnumber}`,
    },
    {
      columnDef: 'rlp',
      header: 'RLP',
      cell: (element: IPlayer) => `${element.rlp}`,
    },
    {
      columnDef: 'stake',
      header: 'SG',
      cell: (element: IPlayer) => `${element.stake.toFixed(2)} €`,
    },
  ];
  protected dataSource: MatTableDataSource<IPlayer> = new MatTableDataSource<IPlayer>();
  protected displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @Input({ required: true })
  icon!: string;

  @Input({ required: true })
  players?: IPlayer[];

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  @Input({ required: true })
  sortingCacheId!: string;

  @Input({ required: true })
  title?: string;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: IPlayer, property: string) => {
      switch (property) {
        case 'firstName':
          return item.first_name;

        case 'lastName':
          return item.last_name;

        default:
          return (item as any)[property];
      }
    };

    this.dataSource.data = this.players!;
  }
}
