import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserGridComponent } from './users/user-grid/user-grid.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchGridComponent } from './matches/match-grid/match-grid.component';
import { MatchFormComponent } from './matches/match-form/match-form.component';
import { RankingGridComponent } from './ranking-grid/ranking-grid.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: UserGridComponent,
      },
      {
        path: ':id/edit',
        component: UserFormComponent,
      },
      {
        path: 'new',
        component: UserFormComponent,
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
