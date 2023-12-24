import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Player} from "../../models/player.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-player-grid',
  standalone: true,
  templateUrl: './player-grid.component.html',
  styleUrl: './player-grid.component.scss',
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
export class PlayerGridComponent {
  dataSource: Player[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPlayers().subscribe((data: Player[]) => {
      this.dataSource = data;
    });
  }

  displayColumns = ['id', 'username', 'displayName', 'email', 'actions'];
}
