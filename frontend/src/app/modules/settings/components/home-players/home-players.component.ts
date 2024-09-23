import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs';

import { DeleteDialogComponent, DeleteDialogData } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { MatTableSortingCacheDirective } from '../../../../shared/directives/mat-table-sorting-cache.directive';

import { ICreateHomePlayer, IPatchHomePlayer } from '../../models/home-player.interface';
import { IHomePlayer } from '../../models/home-player.interface';

import { HomePlayerService } from '../../services/home-player.service';

import { CreatePlayerDialogComponent } from './components/create-player-dialog/create-player-dialog.component';
import { EditPlayerDialogComponent } from './components/edit-player-dialog/edit-player-dialog.component';

@Component({
  selector: 'app-home-players',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatMenuModule, MatTableSortingCacheDirective, OverlayComponent],
  templateUrl: './home-players.component.html',
  styleUrl: './home-players.component.scss',
})
export class HomePlayersComponent {
  protected columns = [
    {
      columnDef: 'id',
      header: 'Nr.',
      cell: (element: IHomePlayer) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: IHomePlayer) => `${element.last_name}, ${element.first_name}`,
    },
    {
      columnDef: 'passnumber',
      header: 'Passnummer',
      cell: (element: IHomePlayer) => `${element.passnumber}`,
    },
    {
      columnDef: 'teams',
      header: 'Mannschaft(en)',
      cell: (element: IHomePlayer) => `${element.teams.map((t) => t.name).join(', ')}`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: (element: IHomePlayer) => '',
    },
  ];
  protected dataSource = new MatTableDataSource<IHomePlayer>();
  protected displayedColumns = this.columns.map((c) => c.columnDef);

  protected isLoading$?: Observable<boolean>;

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  constructor(private readonly dialogService: MatDialog, private readonly homePlayerService: HomePlayerService) {}

  ngOnInit(): void {
    this.isLoading$ = this.homePlayerService.homePlayersLoading$;

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: IHomePlayer, property: string) => {
      switch (property) {
        case 'name':
          return item.last_name;

        case 'teams':
          return item.teams.length;

        default:
          return (item as any)[property];
      }
    };
  }

  openCreatePlayerDialog(): void {
    const createPlayerDialogRef = this.dialogService.open(CreatePlayerDialogComponent);

    createPlayerDialogRef.afterClosed().subscribe((newPlayer: ICreateHomePlayer | undefined) => {
      if (newPlayer) {
        console.error(`Heimspieler '${newPlayer.first_name} ${newPlayer.last_name}' erstellt.`);
        return;
      }

      console.error('Erstellen eines Heimspielers abgebrochen.');
    });
  }

  openDeleteDialog(playerToDelete: IHomePlayer): void {
    const dialogData: DeleteDialogData = { text: `Heimspieler '${playerToDelete.first_name} ${playerToDelete.last_name}' wirklich löschen?`, title: 'Heimspieler löschen' };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        console.error(`Heimspieler '${playerToDelete.first_name} ${playerToDelete.last_name}' gelöscht.`);
        return;
      }

      console.error(`Löschen von Heimspieler '${playerToDelete.first_name} ${playerToDelete.last_name}' abgebrochen.`);
    });
  }

  openEditPlayerDialog(playerToEdit: IHomePlayer): void {
    const editPlayerDialogRef = this.dialogService.open(EditPlayerDialogComponent, { data: playerToEdit });

    editPlayerDialogRef.afterClosed().subscribe((editedPlayer: IPatchHomePlayer | undefined) => {
      if (editedPlayer) {
        console.error(`Heimspieler '${editedPlayer.first_name} ${editedPlayer.last_name}' beabeitet.`);
        return;
      }

      console.error(`Bearbeiten von Heimspieler '${playerToEdit.first_name} ${playerToEdit.last_name}' abgebrochen.`);
    });
  }
}
