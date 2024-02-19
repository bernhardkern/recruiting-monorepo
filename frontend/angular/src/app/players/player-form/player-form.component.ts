import {Component, Input, SimpleChanges} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from '../../_shared/footer/footer.component';
import {ApiService} from "../../services/api.service";
import {Player} from "../../models/player.model";

@Component({
  selector: 'app-player-form',
  standalone: true,
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
  host: { class: 'app-wrapper' },
  imports: [
    NgIf,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatToolbarModule,
    FooterComponent,
  ],
})
export class PlayerFormComponent {
  @Input() username = '';

  constructor(private apiService: ApiService) {}

  elo: number | null = null
  player: Player = {
    id: '',
    username: '',
    displayName: '',
    email: '',
    elo: 0
  }

  isValidEmail(email: string): boolean {
    return !!email;
  }

  isEditForm = () => !!this.username

  submit = () => this.isEditForm() ? this.apiService.updatePlayer(this.player) : this.apiService.createPlayer(this.player)

  ngOnChanges(changes: SimpleChanges) {
    if (changes['username'].currentValue) {
      this.apiService.getPlayerElo(this.username).subscribe((data: number) => {
        this.elo = data;
      });
      this.apiService.getPlayer(this.username).subscribe((data: Player) => {
        this.player = data;
      });
    }
  }
}
