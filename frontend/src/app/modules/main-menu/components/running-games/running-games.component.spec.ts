import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningGamesComponent } from './running-games.component';

describe('RunningGamesComponent', () => {
  let component: RunningGamesComponent;
  let fixture: ComponentFixture<RunningGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
