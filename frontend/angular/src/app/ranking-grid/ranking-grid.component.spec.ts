import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGridComponent } from './ranking-grid.component';

describe('RankingGridComponent', () => {
  let component: RankingGridComponent;
  let fixture: ComponentFixture<RankingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
