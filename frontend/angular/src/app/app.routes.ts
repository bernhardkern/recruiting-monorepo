import { Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserGridComponent} from "./users/user-grid/user-grid.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'overview',
        component: UserGridComponent
      }
    ]
  }
];
