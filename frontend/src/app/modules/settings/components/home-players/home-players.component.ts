import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs';

import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { MatTableSortingCacheDirective } from '../../../../shared/directives/mat-table-sorting-cache.directive';

import { IHomePlayer } from '../../models/home-player.interface';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home-players',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatTableSortingCacheDirective, OverlayComponent],
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

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isLoading$ = this.settingsService.homeTeamsLoading$;

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

    this.dataSource.data = [
      {
        id: 1,
        first_name: 'First',
        last_name: 'Last',
        passnumber: '123456789',
        teams: [
          { id: 1, league: 'Liga 1', name: 'Test 1', number_of_players: 4 },
          { id: 2, league: 'Liga 2', name: 'Test 2', number_of_players: 1 },
        ],
      },
      { id: 2, first_name: 'First 2', last_name: 'Last 3', passnumber: '987654321', teams: [{ id: 1, league: 'Liga 1', name: 'Test 1', number_of_players: 4 }] },
    ];
  }
}
