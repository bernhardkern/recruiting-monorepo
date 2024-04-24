import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FooterComponent} from '../../_shared/footer/footer.component';
import {ApiService} from "../../services/api.service";
import {Player} from "../../models/player.model";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {throwError} from "rxjs";

@Component({
  selector: 'app-player-form',
  standalone: true,
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
  host: {class: 'app-wrapper'},
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
})
export class PlayerFormComponent {
  @Input("player") username = '';
  elo: number | null = null
  playerForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', [Validators.required]],
      elo: [0]
    });
  }

  isValidEmail(email: string): boolean {
    return !!email;
  }

  isEditForm = () => !!this.username

  touchAllFields(): void {
    this.playerForm.markAllAsTouched();
  }

  submit = () => {
    if (this.playerForm.valid) {

      return this.isEditForm() ? this.apiService.updatePlayer(this.playerForm.value) : this.apiService.createPlayer(this.playerForm.value)
    } else {
      this.touchAllFields()
      return throwError(() => new Error('The form is invalid'));
    }
  }

  ngOnInit() {
    if (this.username) {
      this.playerForm.get("username")?.disable()
      this.playerForm.get("elo")?.disable()
      this.apiService.getPlayer(this.username).subscribe((data: Player) => {
        this.playerForm.patchValue({
          id: data.id,
          username: data.username,
          displayName: data.displayName,
          email: data.email
        });
      });

      this.apiService.getPlayerElo(this.username).subscribe((data: number) => {
        this.elo = data;
        this.playerForm.get('elo')?.setValue(data);
      });
    }
  }
}
