import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayerFormComponent} from './player-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from '../../services/api.service';
import {of} from 'rxjs';
import {ToastrModule} from 'ngx-toastr';
import {FooterComponent} from "../../_shared/footer/footer.component";
import {SimpleChange} from "@angular/core";

describe('PlayerFormComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  const playerFixture = {id: '', username: '', displayName: '', email: '', elo: 0}


  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPlayer', 'updatePlayer', 'createPlayer', 'getPlayerElo'])
    mockApiService.getPlayer.and.returnValue(of(playerFixture));
    mockApiService.updatePlayer.and.returnValue(of(playerFixture));
    mockApiService.createPlayer.and.returnValue(of(playerFixture));
    mockApiService.getPlayerElo.and.returnValue(of(0));
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        NoopAnimationsModule,
        PlayerFormComponent,
        FooterComponent,
        ToastrModule.forRoot(),
      ],
      providers: [{provide: ApiService, useValue: mockApiService}],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the validity of an email', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = '';
    expect(component.isValidEmail(validEmail)).toBeTrue();
    expect(component.isValidEmail(invalidEmail)).toBeFalse();
  });

  it('should identify form as edit form if username is provided', () => {
    component.username = 'testuser';
    expect(component.isEditForm()).toBeTrue();

    component.username = '';
    expect(component.isEditForm()).toBeFalse();
  });

  it('should update player when form is in edit mode', async () => {
    const expectedUsername = 'CareBearer';
    const expectedPlayer = {
      id: '1',
      username: expectedUsername,
      displayName: 'Carey Bear',
      email: 'care@bear.de',
      elo: 1000,
    };

    mockApiService.getPlayer.and.returnValue(of(expectedPlayer));
    mockApiService.getPlayerElo.and.returnValue(of(expectedPlayer.elo));

    component.username = expectedUsername;


    component.ngOnChanges({
      username: new SimpleChange(null, expectedUsername, true)
    });

    component.submit();

    expect(component.player).toEqual(expectedPlayer)
    expect(mockApiService.getPlayer).toHaveBeenCalledWith(expectedUsername);
    expect(mockApiService.getPlayerElo).toHaveBeenCalledWith(expectedUsername);
    expect(mockApiService.updatePlayer).toHaveBeenCalledWith(expectedPlayer);
  });

  it('should be edit form if username exists', () => {
    component.username = 'existingUser';
    fixture.detectChanges();

    expect(component.isEditForm()).toBeTrue();
  });

  it('should not be edit form if username does not exist', () => {
    component.username = '';
    fixture.detectChanges();

    expect(component.isEditForm()).toBeFalse();
  });

});
