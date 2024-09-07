import { Routes } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { MainMenuComponent } from './modules/main-menu/main-menu.component';
import { ModerateGameComponent } from './modules/moderate-game/moderate-game.component';
import { ViewGameComponent } from './modules/view-game/view-game.component';

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
        component: MainMenuComponent,
        title: 'Übersicht',
      },
      {
        path: 'settings',
        component: ViewGameComponent,
        title: 'Einstellungen',
      },
      {
        path: 'statistics',
        component: ViewGameComponent,
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
