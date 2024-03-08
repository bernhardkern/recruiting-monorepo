import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {ApiService} from "../services/api.service";
import {RankedPlayer} from "../models/player.model";

@Component({
  selector: 'app-ranking-grid',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule],
  templateUrl: './ranking-grid.component.html',
  styleUrl: './ranking-grid.component.scss',
  host: { class: 'app-wrapper' },
})
export class RankingGridComponent {
  dataSource: RankedPlayer[] = [];

  displayColumns = ['rank', 'elo', 'username', 'displayName', 'email'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRankings(15).subscribe((data: RankedPlayer[]) => {
      this.dataSource = data;
    });
  }
}
