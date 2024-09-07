import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { DeleteDialogComponent, DeleteDialogData } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { MatTableSortingCacheDirective } from '../../../../shared/directives/mat-table-sorting-cache.directive';

import { IHomeTeam } from '../../models/home-team.interface';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home-team',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatTableSortingCacheDirective, OverlayComponent],
  templateUrl: './home-team.component.html',
  styleUrl: './home-team.component.scss',
})
export class HomeTeamComponent {
  protected columns = [
    {
      columnDef: 'id',
      header: 'Nr.',
      cell: (element: IHomeTeam) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: IHomeTeam) => `${element.name}`,
    },
    {
      columnDef: 'numberOfPlayers',
      header: 'Anzahl Spieler',
      cell: (element: IHomeTeam) => `${element.number_of_players}`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: (element: IHomeTeam) => '',
    },
  ];
  protected dataSource = new MatTableDataSource<IHomeTeam>();
  protected displayedColumns = this.columns.map((c) => c.columnDef);

  protected isLoading$?: Observable<boolean>;

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  constructor(private readonly dialogService: MatDialog, private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isLoading$ = this.settingsService.homeTeamsLoading$;

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: IHomeTeam, property: string) => {
      switch (property) {
        case 'numberOfPlayers':
          return item.number_of_players;

        default:
          return (item as any)[property];
      }
    };

    this.dataSource.data = [
      { id: 1, league: 'Liga 1', name: 'Test', number_of_players: 5 },
      { id: 2, league: 'Liga 2', name: 'Test 2', number_of_players: 1 },
    ];
  }

  openDeleteDialog(teamToDelete: IHomeTeam): void {
    const dialogData: DeleteDialogData = { text: `Heimmannschaft '${teamToDelete.name}' wirklich löschen?`, title: 'Heimmannschaft löschen' };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        console.error(`Heimmannschaft '${teamToDelete.name}' gelöscht.`);
        return;
      }

      console.error(`Löschen von Heimmannschaft '${teamToDelete.name}' abgebrochen.`);
    });
  }
}
