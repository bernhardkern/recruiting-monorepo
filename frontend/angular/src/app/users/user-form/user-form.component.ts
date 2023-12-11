import {Component, inject, Input} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";





@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() id = '';


  user = {id: 1, userName: 'Hydrogen', displayName: 'Neon', email: "Neon@Neon.de"}

  onSubmit() {
    console.log('Form submitted:', this.user);
  }

  isValidEmail(email: string): boolean {
    return !!email;
  }

}
