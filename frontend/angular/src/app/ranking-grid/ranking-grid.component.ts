import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-ranking-grid',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule],
  templateUrl: './ranking-grid.component.html',
  styleUrl: './ranking-grid.component.scss',
  host: { class: 'app-wrapper' },
})
export class RankingGridComponent {
  dataSource = [
    {
      id: 10,
      userName: 'Neon',
      displayName: 'Hydrogen',
      email: 'Hydrogen@Hydrogen.de',
      elo: 900,
      rank: 1,
    },
    {
      id: 9,
      userName: 'Fluorine',
      displayName: 'Helium',
      email: 'Helium@Helium.de',
      elo: 800,
      rank: 2,
    },
    {
      id: 8,
      userName: 'Oxygen',
      displayName: 'Lithium',
      email: 'Lithium@Lithium.de',
      elo: 700,
      rank: 3,
    },
    {
      id: 7,
      userName: 'Nitrogen',
      displayName: 'Beryllium',
      email: 'Beryllium@Beryllium.de',
      elo: 600,
      rank: 4,
    },
    {
      id: 6,
      userName: 'Carbon',
      displayName: 'Boron',
      email: 'Boron@Boron.de',
      elo: 500,
      rank: 5,
    },
    {
      id: 5,
      userName: 'Boron',
      displayName: 'Carbon',
      email: 'Carbon@Carbon.de',
      elo: 400,
      rank: 6,
    },
    {
      id: 4,
      userName: 'Beryllium',
      displayName: 'Nitrogen',
      email: 'Nitrogen@Nitrogen.de',
      elo: 300,
      rank: 7,
    },
    {
      id: 3,
      userName: 'Lithium',
      displayName: 'Oxygen',
      email: 'Oxygen@Oxygen.de',
      elo: 200,
      rank: 8,
    },
    {
      id: 2,
      userName: 'Helium',
      displayName: 'Fluorine',
      email: 'Fluorine@Fluorine.de',
      elo: 100,
      rank: 9,
    },
    {
      id: 1,
      userName: 'Hydrogen',
      displayName: 'Neon',
      email: 'Neon@Neon.de',
      elo: 0,
      rank: 10,
    },
  ];

  displayColumns = ['rank', 'elo', 'userName', 'displayName', 'email'];
}
