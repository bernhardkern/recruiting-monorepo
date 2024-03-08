import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    MatListModule,
    RouterModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iits chess elo manager';

  navList = [
    {
      title: 'Players',
      routerLink: '/players',
    },
    {
      title: 'Matches',
      routerLink: '/matches',
    },
    {
      title: 'Ranking',
      routerLink: '/ranking',
    },
  ];
}
