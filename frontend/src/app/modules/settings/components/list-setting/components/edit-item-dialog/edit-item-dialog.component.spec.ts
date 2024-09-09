import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemDialogComponent } from './edit-item-dialog.component';

describe('EditItemDialogComponent', () => {
  let component: EditItemDialogComponent;
  let fixture: ComponentFixture<EditItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
