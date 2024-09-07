import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatDividerModule, HeaderComponent, FooterComponent, SidenavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
