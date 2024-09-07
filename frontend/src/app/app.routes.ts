import { Routes } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { ModerateGameComponent } from './modules/moderate-game/moderate-game.component';
import { ViewGameComponent } from './modules/view-game/view-game.component';
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
        path: 'moderate/:id',
        component: ModerateGameComponent,
        title: 'Moderation',
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
      {
        path: 'view/:id',
        component: ViewGameComponent,
        title: 'Ansicht',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
