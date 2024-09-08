import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { IGame, IGameInfoChange, IHomeTeamInfo } from '../../../../models/game.interface';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatIconModule, MatDividerModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent implements OnDestroy, OnInit {
  protected dataSource: MatTableDataSource<IGame | undefined> = new MatTableDataSource<IGame | undefined>();
  protected displayedColumns: string[] = ['homeTeam', 'guestTeam'];

  homeTeams?: IHomeTeamInfo[] = [
    {
      id: 0,
      name: 'Home',
    },
    {
      id: 1,
      name: 'Home 2',
    },
    {
      id: 2,
      name: 'Home 3',
    },
  ];

  protected formGroup!: FormGroup;
  private formGroupValueChangesSubscription?: Subscription;

  @Input({ required: true })
  game?: IGame;

  protected leagues?: string[] = ['A1', 'B1', 'BZ'];
  protected matchdays?: number[] = Array.from(Array(16).keys()).map((x) => x + 1);
  protected modes?: string[] = ['301SO', '301DO', '501SO', '501DO'];

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.formGroupValueChangesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      homeTeam: [this.game?.home_team.id, [Validators.required]],
      guestTeam: [this.game?.guest_team.name, [Validators.required]],
      matchday: [this.game?.info.matchday, [Validators.required]],
      league: [this.game?.info.league, [Validators.required]],
      mode: [this.game?.info.mode, [Validators.required]],
      stake: [this.game?.info.stake, [Validators.required]],
    });

    this.formGroupValueChangesSubscription = this.formGroup.valueChanges.subscribe({
      next: (value: any) => {
        this.emitGameInfoChange();
      },
    });

    this.dataSource.data = [this.game];
  }

  private emitGameInfoChange(): void {
    const updatedGameInfo: IGameInfoChange = {
      guest_team_name: this.formGroup.get('guestTeam')?.value,
      home_team_id: this.formGroup.get('homeTeam')?.value,
      league: this.formGroup.get('league')?.value,
      matchday: this.formGroup.get('matchday')?.value,
      mode: this.formGroup.get('mode')?.value,
      stake: this.formGroup.get('stake')?.value,
    };

    // this.gameInfoChange.emit(updatedGameInfo);
  }
}
