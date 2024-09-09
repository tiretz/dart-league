import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettingComponent } from './list-setting.component';

describe('ListSettingComponent', () => {
  let component: ListSettingComponent;
  let fixture: ComponentFixture<ListSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
