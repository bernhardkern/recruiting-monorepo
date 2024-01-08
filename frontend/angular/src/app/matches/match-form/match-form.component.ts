import {Component, Input, SimpleChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FooterComponent} from '../../_shared/footer/footer.component';
import {ApiService} from "../../services/api.service";
import {Player} from "../../models/player.model";
import {Match} from "../../models/match.model";

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterModule,
    MatNativeDateModule,
    MatToolbarModule,
    FooterComponent,
    NgForOf
  ],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss',
  host: {class: 'app-wrapper'},
})
export class MatchFormComponent {
  @Input() id = '';
  constructor(private apiService: ApiService) {}

  match: Match = {whitePlayerUsername: '', blackPlayerUsername: '', outcome: '', date: ''};
  players: string[] = [];

  outcomes: string[] = ['WHITE_WINS', 'BLACK_WINS', 'DRAW'];

  submit = this.apiService.createMatch(this.match)


  ngOnInit() {
    this.apiService.getPlayers().subscribe((data: Player[]) => {
      this.players = data.map((player) => player.displayName).sort();
    });
  }
}
