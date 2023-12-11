import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-match-grid',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './match-grid.component.html',
  styleUrl: './match-grid.component.scss'
})
export class MatchGridComponent {
  dataSource = [
    {id: 1, player1: 'Hydrogen', player2: 'Neon', outcome: "ONE_WINS", date: "2023-12-01 14:36:00"},
    {id: 2, player1: 'Helium', player2: 'Fluorine', outcome: "ONE_WINS", date: "2023-12-02 14:36:00"},
    {id: 3, player1: 'Lithium', player2: 'Oxygen', outcome: "TWO_WINS", date: "2023-12-03 14:36:00"},
    {id: 4, player1: 'Beryllium', player2: 'Nitrogen', outcome: "ONE_WINS", date: "2023-12-04 14:36:00"},
    {id: 5, player1: 'Boron', player2: 'Carbon', outcome: "ONE_WINS", date: "2023-12-05 14:36:00"},
    {id: 6, player1: 'Carbon', player2: 'Boron', outcome: "TWO_WINS", date: "2023-12-06 14:36:00"},
    {id: 7, player1: 'Nitrogen', player2: 'Beryllium', outcome: "ONE_WINS", date: "2023-12-07 14:36:00"},
    {id: 8, player1: 'Oxygen', player2: 'Lithium', outcome: "ONE_WINS", date: "2023-12-08 14:36:00"},
    {id: 9, player1: 'Fluorine', player2: 'Helium', outcome: "TWO_WINS", date: "2023-12-09 14:36:00"},
    {id: 10,player1: 'Neon', player2: 'Hydrogen', outcome: "ONE_WINS", date: "2023-12-10 14:36:00"},
  ];

  displayColumns = ['id', 'player1', 'player2', 'outcome' ];

}
