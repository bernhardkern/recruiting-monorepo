import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {FooterComponent} from './footer.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActiveToast, ToastrModule, ToastrService} from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ActivatedRoute, Router} from "@angular/router";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockToastrService.success.and.returnValue({} as ActiveToast<any>);
    mockToastrService.error.and.returnValue({} as ActiveToast<any>);

    await TestBed.configureTestingModule({

      imports: [MatToolbarModule, MatButtonModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        {provide: ToastrService, useValue: mockToastrService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [{path: 'edit'}],
            },

          },
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back on cancel', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onCancelClicked();
    expect(router.navigate).toHaveBeenCalled();
  });
});
