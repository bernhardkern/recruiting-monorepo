import {Component, Input, SimpleChanges} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { Observable } from 'rxjs';
import {ApiService} from "../../services/api.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
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
export class UserFormComponent {
  @Input() userName = '';

  constructor(private apiService: ApiService) {}

  elo: number | null = null
  user: User = {
    id: '',
    userName: '',
    displayName: '',
    email: ''
  }

  isValidEmail(email: string): boolean {
    return !!email;
  }

  isEditForm = () => !!this.userName

  submit = () => this.isEditForm() ? this.apiService.updateUser(this.user) : this.apiService.createUser(this.user)

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userName'].currentValue) {
      this.apiService.getUserElo(this.userName).subscribe((data: number) => {
        this.elo = data;
      });
      this.apiService.getUser(this.userName).subscribe((data: User) => {
        this.user = data;
      });
    }
  }
}
