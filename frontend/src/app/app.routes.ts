import { Routes } from '@angular/router';

import { GameComponent } from './modules/game/game.component';
import { ModerateGameComponent } from './modules/game/components/moderate-game/moderate-game.component';
import { ViewGameComponent } from './modules/game/components/view-game/view-game.component';
import { MainComponent } from './modules/main/main.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'game/:id',
        component: GameComponent,
        title: '',
        children: [
          {
            path: 'moderate',
            component: ModerateGameComponent,
            title: 'Moderation',
          },
          {
            path: 'view',
            component: ViewGameComponent,
            title: 'Ansicht',
          },
        ],
      },
      {
        path: 'overview',
        component: OverviewComponent,
        title: 'Übersicht',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Einstellungen',
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        title: 'Statistik',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
