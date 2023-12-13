import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";

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
  dataSource: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.dataSource = data;
    });
  }

  displayColumns = ['id', 'userName', 'displayName', 'email', 'actions'];
}
