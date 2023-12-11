import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

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
  @Input() save?: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

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
    // navigate to edit page
    this.save?.subscribe();
  }
}
