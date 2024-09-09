import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlayerDialogComponent } from './create-player-dialog.component';

describe('CreatePlayerDialogComponent', () => {
  let component: CreatePlayerDialogComponent;
  let fixture: ComponentFixture<CreatePlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlayerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
