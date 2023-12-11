import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {RouterLink, RouterModule} from "@angular/router";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule for reactive forms
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterModule,
    MatNativeDateModule
  ],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss'
})
export class MatchFormComponent {
  @Input() id = '';


  match = {player1: '', player2: '', outcome: '', date: null}
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
    'Neon',];

  outcomes: string[] = [
    'ONE_WINS',
    'TWO_WINS',
    'DRAW'
  ]

  onSubmit() {
    console.log('Form submitted:', this.match);
  }
}
