import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateGameComponent } from './moderate-game.component';

describe('ModerateGameComponent', () => {
  let component: ModerateGameComponent;
  let fixture: ComponentFixture<ModerateGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerateGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
