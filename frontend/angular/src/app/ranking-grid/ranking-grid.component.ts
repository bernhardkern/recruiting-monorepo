import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {ApiService} from "../services/api.service";
import {RankedUser, User} from "../models/user.model";
import {Match} from "../models/match.model";

@Component({
  selector: 'app-ranking-grid',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule],
  templateUrl: './ranking-grid.component.html',
  styleUrl: './ranking-grid.component.scss',
  host: { class: 'app-wrapper' },
})
export class RankingGridComponent {
  dataSource: RankedUser[] = [];

  displayColumns = ['rank', 'elo', 'userName', 'displayName', 'email'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRankings().subscribe((data: RankedUser[]) => {
      this.dataSource = data;
    });
  }
}
