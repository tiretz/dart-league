import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableSortingCacheDirective } from '../../../../../../shared/directives/mat-table-sorting-cache.directive';

import { IPlayer } from '../../../../models/game.interface';

import { ChooseHomePlayerDialogComponent } from './components/choose-home-player-dialog/choose-home-player-dialog.component';
import { ChooseGuestPlayerDialogComponent } from './components/choose-guest-player-dialog/choose-guest-player-dialog.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTooltipModule, MatTableModule, MatSortModule, MatTableSortingCacheDirective],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  @Input()
  areHomeTeamPlayers: boolean = true;

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
    {
      columnDef: 'actions',
      header: '',
      cell: (element: IPlayer) => '',
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

  constructor(private readonly dialogService: MatDialog) {}

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

  openChoosePlayerDialog(player: IPlayer) {
    let choosePlayerDialogRef: MatDialogRef<ChooseHomePlayerDialogComponent | ChooseGuestPlayerDialogComponent, any>;

    if (this.areHomeTeamPlayers) {
      choosePlayerDialogRef = this.dialogService.open(ChooseHomePlayerDialogComponent, { data: { selectedPlayer: player, selectablePlayers: [] } });
    } else {
      choosePlayerDialogRef = this.dialogService.open(ChooseGuestPlayerDialogComponent, { data: { selectedPlayer: player, selectablePlayers: [] } });
    }

    choosePlayerDialogRef.afterClosed().subscribe((selectedPlayer: IPlayer | undefined) => {
      if (selectedPlayer) {
        console.error(`Spieler '${selectedPlayer.first_name} ${selectedPlayer.first_name}' ausgewählt.`);
        return;
      }

      console.error(`Auswahl abgebrochen.`);
    });
  }
}
