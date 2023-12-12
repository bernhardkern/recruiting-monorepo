import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Match} from "../../models/match.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-match-grid',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    FooterComponent,
    MatToolbarModule,
  ],
  templateUrl: './match-grid.component.html',
  styleUrl: './match-grid.component.scss',
  host: { class: 'app-wrapper' },
})
export class MatchGridComponent {
  dataSource: Match[] = []

  displayColumns = ['id', 'player1', 'player2', 'outcome'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMatches().subscribe((data: Match[]) => {
      this.dataSource = data;
    });
  }
}
