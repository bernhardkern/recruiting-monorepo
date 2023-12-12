import {NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() isGridComponent = false;
  @Input() isEditForm = false;
  @Input() saveDisabled = false;
  @Input() save: Observable<any> = EMPTY;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onCancelClicked() {
    this.navigateBack();
  }

  onSaveClicked() {
    this.emitSave();
  }

  private navigateBack(): void {
    let navigateCommand: string[];

    if (this.isEditForm && !this.isGridComponent) {
      navigateCommand = ['../../'];
    } else {
      navigateCommand = ['../'];
    }

    this.router.navigate(navigateCommand, {
      relativeTo: this.route,
    });
  }

  private emitSave() {
    this.save.subscribe({
      next: (data) => this.snackBar.open('Save successful!', 'Dismiss', {
        duration: 3000,

      }),
      error: () => this.snackBar.open('Save error!', 'Dismiss', {
        duration: 3000,
      },)
    });
  }
}
