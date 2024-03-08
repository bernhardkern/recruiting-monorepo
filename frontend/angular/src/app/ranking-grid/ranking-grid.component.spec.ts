import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RankingGridComponent} from './ranking-grid.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ApiService} from '../services/api.service';
import {of} from 'rxjs';
import {RankedPlayer} from "../models/player.model";

describe('RankingGridComponent', () => {
  let component: RankingGridComponent;
  let fixture: ComponentFixture<RankingGridComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getRankings']);
    mockApiService.getRankings.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule
      ],
      providers: [{provide: ApiService, useValue: mockApiService}],
    }).compileComponents();

    fixture = TestBed.createComponent(RankingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rankings on init', () => {
    const mockRankings: RankedPlayer[] = [
      {
        rank: 1,
        player: {id: '', username: 'champion', displayName: 'Champion', email: 'champion@example.com', elo: 1500}
      },
      {
        rank: 2,
        player: {id: '', username: 'challenger', displayName: 'Challenger', email: 'challenger@example.com', elo: 1450}
      },
    ];

    mockApiService.getRankings.and.returnValue(of(mockRankings));

    component.ngOnInit();

    expect(mockApiService.getRankings).toHaveBeenCalledWith(15);
    expect(component.dataSource).toEqual(mockRankings);
  });


});
