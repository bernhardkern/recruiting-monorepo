import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from '../../_shared/footer/footer.component';
import { Observable } from 'rxjs';

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
  @Input() id = '';

  user = {
    id: 1,
    userName: 'Hydrogen',
    displayName: 'Neon',
    email: 'Neon@Neon.de',
  };

  onSubmit() {
    console.log('Form submitted:', this.user);
  }

  isValidEmail(email: string): boolean {
    return !!email;
  }

  save() {
    return new Observable();
  }
}
