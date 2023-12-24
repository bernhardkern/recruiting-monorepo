import { Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PlayerGridComponent } from './players/player-grid/player-grid.component';
import { PlayerFormComponent } from './players/player-form/player-form.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchGridComponent } from './matches/match-grid/match-grid.component';
import { MatchFormComponent } from './matches/match-form/match-form.component';
import { RankingGridComponent } from './ranking-grid/ranking-grid.component';

export const routes: Routes = [
  {
    path: 'players',
    component: PlayersComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: PlayerGridComponent,
      },
      {
        path: ':playerName/edit',
        component: PlayerFormComponent,
      },
      {
        path: 'new',
        component: PlayerFormComponent,
      },
    ],
  },
  {
    path: 'matches',
    component: MatchesComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: MatchGridComponent,
      },
      {
        path: 'new',
        component: MatchFormComponent,
      },
    ],
  },
  {
    path: 'ranking',
    component: RankingGridComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
