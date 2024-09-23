import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import sortingDataAccessor from '../../../../core/utils/sorting-data-accessor';

import { DeleteDialogComponent, DeleteDialogData } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { MatTableSortingCacheDirective } from '../../../../shared/directives/mat-table-sorting-cache.directive';

import { ICreateHomeTeam, IHomeTeam, IPatchHomeTeam } from '../../models/home-team.interface';

import { HomeTeamService } from '../../services/home-team.service';

import { CreateTeamDialogComponent } from './components/create-team-dialog/create-team-dialog.component';
import { EditTeamDialogComponent } from './components/edit-team-dialog/edit-team-dialog.component';

@Component({
  selector: 'app-home-team',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatMenuModule, MatTableSortingCacheDirective, OverlayComponent],
  templateUrl: './home-team.component.html',
  styleUrl: './home-team.component.scss',
})
export class HomeTeamComponent {
  protected columns = ['number', 'name', 'league', 'numberOfPlayers', 'actions'];
  protected dataSource = new MatTableDataSource<IHomeTeam>();

  protected isLoading$?: Observable<boolean>;

  @ViewChild(MatSort, { static: true })
  protected sort!: MatSort;

  constructor(private readonly dialogService: MatDialog, private readonly homeTeamService: HomeTeamService) {}

  ngOnInit(): void {
    this.isLoading$ = this.homeTeamService.homeTeamsLoading$;

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: IHomeTeam, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'league':
          return sortingDataAccessor.nestedProperty(data, 'league.name');

        default:
          return sortingDataAccessor.nestedProperty(data, sortHeaderId);
      }
    };

    this.getHomeTeams();
  }

  private getHomeTeams(): void {
    this.homeTeamService.getHomeTeams().subscribe({
      next: (homeTeams: IHomeTeam[]) => {
        this.dataSource.data = homeTeams;
      },
    });
  }

  openCreateTeamDialog(): void {
    const createTeamDialogRef = this.dialogService.open(CreateTeamDialogComponent);

    createTeamDialogRef.afterClosed().subscribe((newTeam: ICreateHomeTeam | undefined) => {
      if (!newTeam) {
        return;
      }

      this.homeTeamService.createHomeTeam(newTeam).subscribe({
        next: (homeTeam: IHomeTeam) => {
          this.getHomeTeams();
        },
      });
    });
  }

  openDeleteDialog(teamToDelete: IHomeTeam): void {
    const dialogData: DeleteDialogData = { text: `Heimmannschaft '${teamToDelete.name}' wirklich löschen?`, title: 'Heimmannschaft löschen' };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (!result) {
        return;
      }

      this.homeTeamService.deleteHomeTeam(teamToDelete.id).subscribe({
        next: (homeTeam: IHomeTeam) => {
          this.getHomeTeams();
        },
      });
    });
  }

  openEditTeamDialog(teamToEdit: IHomeTeam): void {
    const editTeamDialogRef = this.dialogService.open(EditTeamDialogComponent, { data: teamToEdit });

    editTeamDialogRef.afterClosed().subscribe((editedTeam: IPatchHomeTeam | undefined) => {
      if (!editedTeam) {
        return;
      }

      this.homeTeamService.patchHomeTeam(editedTeam).subscribe({
        next: (homeTeam: IHomeTeam) => {
          this.getHomeTeams();
        },
      });
    });
  }
}
