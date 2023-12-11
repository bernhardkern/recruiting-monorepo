import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.scss',
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    FooterComponent,
    MatToolbarModule,
  ],
  host: { class: 'app-wrapper' },
})
export class UserGridComponent {
  dataSource = [
    { id: 1, userName: 'Hydrogen', displayName: 'Neon', email: 'Neon@Neon.de' },
    {
      id: 2,
      userName: 'Helium',
      displayName: 'Fluorine',
      email: 'Fluorine@Fluorine.de',
    },
    {
      id: 3,
      userName: 'Lithium',
      displayName: 'Oxygen',
      email: 'Oxygen@Oxygen.de',
    },
    {
      id: 4,
      userName: 'Beryllium',
      displayName: 'Nitrogen',
      email: 'Nitrogen@Nitrogen.de',
    },
    {
      id: 5,
      userName: 'Boron',
      displayName: 'Carbon',
      email: 'Carbon@Carbon.de',
    },
    {
      id: 6,
      userName: 'Carbon',
      displayName: 'Boron',
      email: 'Boron@Boron.de',
    },
    {
      id: 7,
      userName: 'Nitrogen',
      displayName: 'Beryllium',
      email: 'Beryllium@Beryllium.de',
    },
    {
      id: 8,
      userName: 'Oxygen',
      displayName: 'Lithium',
      email: 'Lithium@Lithium.de',
    },
    {
      id: 9,
      userName: 'Fluorine',
      displayName: 'Helium',
      email: 'Helium@Helium.de',
    },
    {
      id: 10,
      userName: 'Neon',
      displayName: 'Hydrogen',
      email: 'Hydrogen@Hydrogen.de',
    },
  ];

  displayColumns = ['id', 'userName', 'displayName', 'email', 'actions'];
}
