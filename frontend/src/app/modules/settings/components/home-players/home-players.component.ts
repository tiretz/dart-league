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
import { TeamsToCommaListPipe } from '../../../../shared/pipes/teams-to-comma-list.pipe';

import { ICreateHomePlayer, IHomePlayer, IPatchHomePlayer } from '../../models/home-player.interface';

import { HomePlayerService } from '../../services/home-player.service';

import { CreatePlayerDialogComponent } from './components/create-player-dialog/create-player-dialog.component';
import { EditPlayerDialogComponent } from './components/edit-player-dialog/edit-player-dialog.component';

@Component({
  selector: 'app-home-players',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatMenuModule, MatTableSortingCacheDirective, OverlayComponent, TeamsToCommaListPipe],
  templateUrl: './home-players.component.html',
  styleUrl: './home-players.component.scss',
})
export class HomePlayersComponent {
  protected columns = ['number', 'name', 'passnumber', 'teams', 'actions'];
  protected dataSource = new MatTableDataSource<IHomePlayer>();

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
          return item.lastName;

        case 'teams':
          return item.teams.length;

        default:
          return (item as any)[property];
      }
    };

    this.getHomePlayers();
  }

  private getHomePlayers(): void {
    this.homePlayerService.getHomePlayers().subscribe({
      next: (homePlayers: IHomePlayer[]) => {
        this.dataSource.data = homePlayers;
      },
    });
  }

  openCreatePlayerDialog(): void {
    const createPlayerDialogRef = this.dialogService.open(CreatePlayerDialogComponent);

    createPlayerDialogRef.afterClosed().subscribe((newHomePlayer: ICreateHomePlayer | undefined) => {
      if (!newHomePlayer) {
        return;
      }

      this.homePlayerService.createHomePlayer(newHomePlayer).subscribe({
        next: (homePlayer: IHomePlayer) => {
          this.getHomePlayers();
        },
      });
    });
  }

  openDeleteDialog(playerToDelete: IHomePlayer): void {
    const dialogData: DeleteDialogData = { text: `Heimspieler '${playerToDelete.firstName} ${playerToDelete.lastName}' wirklich löschen?`, title: 'Heimspieler löschen' };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (!result) {
        return;
      }

      this.homePlayerService.deleteHomePlayer(playerToDelete.id).subscribe({
        next: (homePlayer: IHomePlayer) => {
          this.getHomePlayers();
        },
      });
    });
  }

  openEditPlayerDialog(playerToEdit: IHomePlayer): void {
    const editPlayerDialogRef = this.dialogService.open(EditPlayerDialogComponent, { data: playerToEdit });

    editPlayerDialogRef.afterClosed().subscribe((editedHomePlayer: IPatchHomePlayer | undefined) => {
      if (!editedHomePlayer) {
        return;
      }

      this.homePlayerService.patchHomePlayer(editedHomePlayer).subscribe({
        next: (homePlayer: IHomePlayer) => {
          this.getHomePlayers();
        },
      });
    });
  }
}
