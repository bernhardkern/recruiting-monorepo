import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PlayersComponent} from "./players.component";

describe('PlayersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PlayersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
