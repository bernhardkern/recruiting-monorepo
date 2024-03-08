import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayerGridComponent} from './player-grid.component';
import {MatTableModule} from '@angular/material/table';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FooterComponent} from '../../_shared/footer/footer.component';
import {ApiService} from '../../services/api.service';
import {of} from 'rxjs';
import {Player} from "../../models/player.model";
import {ToastrModule} from "ngx-toastr";

describe('PlayerGridComponent', () => {
  let component: PlayerGridComponent;
  let fixture: ComponentFixture<PlayerGridComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPlayers'])
    mockApiService.getPlayers.and.returnValue(of([]));
    await TestBed.configureTestingModule({

      imports: [
        MatTableModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        FooterComponent,
        ToastrModule.forRoot()
      ],
      providers:
        [{provide: ApiService, useValue: mockApiService}]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerGridComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load players on init', () => {
    const mockPlayers: Player[] = [
      {id: '1', username: 'playerOne', displayName: 'Player One', email: 'playerone@example.com', elo: 1200},
      {id: '2', username: 'playerTwo', displayName: 'Player Two', email: 'playertwo@example.com', elo: 1300},
    ];

    mockApiService.getPlayers.and.returnValue(of(mockPlayers));
    component.ngOnInit();

    expect(mockApiService.getPlayers).toHaveBeenCalled();
    expect(component.dataSource).toEqual(mockPlayers);
  });
});
