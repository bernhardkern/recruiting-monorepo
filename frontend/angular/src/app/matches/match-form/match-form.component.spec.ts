import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatchFormComponent} from './match-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {ApiService} from "../../services/api.service";
import {of} from "rxjs";
import {Match} from "../../models/match.model";
import {Player} from "../../models/player.model";

describe('MatchFormComponent', () => {
  let component: MatchFormComponent;
  let fixture: ComponentFixture<MatchFormComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPlayers', 'createMatch']);
    mockApiService.getPlayers.and.returnValue(of([]));
    mockApiService.createMatch.and.returnValue(of({
      whitePlayerUsername: '',
      blackPlayerUsername: '',
      outcome: '',
      date: ''
    }));
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ToastrModule.forRoot()
      ],
      providers: [{provide: ApiService, useValue: mockApiService}],

    }).compileComponents();

    fixture = TestBed.createComponent(MatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch players on init', async () => {
    const mockPlayers: Player[] = [
      { id: '1', username: 'SunshineHeart', displayName: 'Sunshine Heart', email: 'sunshine@carebears.com', elo: 2000 },
      { id: '2', username: 'RainbowHug', displayName: 'Rainbow Hug', email: 'rainbow@carebears.com', elo: 1900 }
    ];
    mockApiService.getPlayers.and.returnValue(of(mockPlayers));

    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockApiService.getPlayers).toHaveBeenCalled();
    expect(component.players).toEqual(jasmine.arrayContaining(['Rainbow Hug', 'Sunshine Heart']));
  });

  it('should call apiService.createMatch when submit is called', () => {
    const matchToSubmit: Match = {
      whitePlayerUsername: 'SunshineHeart',
      blackPlayerUsername: 'RainbowHug',
      outcome: 'WHITE_WINS',
    };

    component.matchForm.patchValue(matchToSubmit);
    mockApiService.createMatch.and.returnValue(of(matchToSubmit));

    component.ngOnInit()

    component.submit();

    expect(mockApiService.createMatch).toHaveBeenCalledWith(matchToSubmit);
  });


});
