import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from '../../_shared/footer/footer.component';

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
    FooterComponent
  ],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss',
  host: { class: 'app-wrapper' },
})
export class MatchFormComponent {
  @Input() id = '';

  match = { player1: '', player2: '', outcome: '', date: null };
  players: string[] = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium',
    'Boron',
    'Carbon',
    'Nitrogen',
    'Oxygen',
    'Fluorine',
    'Neon',
  ];

  outcomes: string[] = ['ONE_WINS', 'TWO_WINS', 'DRAW'];

  onSubmit() {
    console.log('Form submitted:', this.match);
  }
}
