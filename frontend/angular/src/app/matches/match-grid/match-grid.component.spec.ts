import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchGridComponent } from './match-grid.component';

describe('MatchGridComponent', () => {
  let component: MatchGridComponent;
  let fixture: ComponentFixture<MatchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
