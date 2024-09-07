import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericSettingComponent } from './numeric-setting.component';

describe('NumericSettingComponent', () => {
  let component: NumericSettingComponent;
  let fixture: ComponentFixture<NumericSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
