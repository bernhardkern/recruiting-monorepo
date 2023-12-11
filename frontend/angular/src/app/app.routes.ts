import { Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserGridComponent} from "./users/user-grid/user-grid.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {UserFormComponent} from "./users/user-form/user-form.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'overview',
        component: UserGridComponent
      },
      {
        path: ':id/edit',
        component: UserFormComponent
      },
      {
        path: 'new',
        component: UserFormComponent
      },
      {
        path: ':id',
        component: UserDetailsComponent
      },

    ]
  }
];
