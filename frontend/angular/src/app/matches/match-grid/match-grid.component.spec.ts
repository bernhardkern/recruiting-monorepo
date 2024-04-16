import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchGridComponent } from './match-grid.component';
import { ApiService } from '../../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Match } from '../../models/match.model';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('MatchGridComponent', () => {
  let component: MatchGridComponent;
  let fixture: ComponentFixture<MatchGridComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getMatches']);
    mockApiService.getMatches.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        RouterTestingModule,
        MatToolbarModule,
        ToastrModule.forRoot(),
      ],
      providers: [{ provide: ApiService, useValue: mockApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch matches on init', () => {
    const mockMatches: Match[] = [
      {
        id: '1',
        whitePlayerUsername: 'CheerBear',
        blackPlayerUsername: 'GrumpyBear',
        outcome: 'DRAW',
        playedOn: new Date().toISOString(),
      },
      {
        id: '2',
        whitePlayerUsername: 'FunshineBear',
        blackPlayerUsername: 'AmigoBear',
        outcome: 'WHITE_WINS',
        playedOn: new Date().toISOString(),
      },
    ];

    mockApiService.getMatches.and.returnValue(of(mockMatches));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockApiService.getMatches).toHaveBeenCalled();
    expect(component.dataSource).toEqual(mockMatches);
  });

  it('should handle empty data scenario without errors', () => {
    mockApiService.getMatches.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dataSource).toEqual([]);
  });

  it('should have correct display columns', () => {
    const expectedColumns = [
      'id',
      'whitePlayerUsername',
      'blackPlayerUsername',
      'outcome',
    ];
    expect(component.displayColumns).toEqual(expectedColumns);
  });
});
