import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        NoopAnimationsModule // Helps test animations without actually animating
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular'`, () => {
    expect(component.title).toEqual('iits chess elo manager');
  });

  it('should render navigation links correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    const navLinks = compiled.querySelectorAll('a[mat-list-item]');
    expect(navLinks.length).toEqual(component.navList.length);
    for (let i = 0; i < navLinks.length; i++) {
      expect(navLinks[i].textContent).toContain(component.navList[i].title);
      expect(navLinks[i].getAttribute('href')).toContain(component.navList[i].routerLink);
    }
  });

  it('should display the correct toolbar title', () => {
    const compiled = fixture.debugElement.nativeElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    expect(toolbar.textContent).toContain('Chess Elo Calculator');
  });

  // Additional tests can be added here...
});
