import {Component, inject, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";





@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() id = '';

}
