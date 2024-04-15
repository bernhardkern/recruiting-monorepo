import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {Observable, throwError} from "rxjs";

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss',
  host: {class: 'app-wrapper'},
})
export class MatchFormComponent {
  @Input() id = '';
  matchForm: FormGroup;

  players: string[] = [];
  outcomes: string[] = ['WHITE_WINS', 'BLACK_WINS', 'DRAW'];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.matchForm = this.fb.group({
      whitePlayerUsername: ['', Validators.required],
      blackPlayerUsername: ['', Validators.required],
      outcome: ['', Validators.required]
    });
  }

  touchAllFields(): void {
    this.matchForm.markAllAsTouched();
  }

  submit = (): Observable<Match> => {
    if (this.matchForm.valid) {

      return this.apiService.createMatch(this.matchForm.value);
    } else {
      this.touchAllFields()
      return throwError(() => new Error('The form is invalid'));
    }
  }

  ngOnInit() {

    this.apiService.getPlayers().subscribe((data: Player[]) => {
      this.players = data.map((player) => player.displayName).sort();
    });
  }

  protected readonly JSON = JSON;
}
