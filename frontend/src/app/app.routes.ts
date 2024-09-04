import { Routes } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { MainMenuComponent } from './modules/main-menu/main-menu.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: MainMenuComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
