import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTypesFormComponent } from './pay-types-form.component';

describe('PayTypesFormComponent', () => {
  let component: PayTypesFormComponent;
  let fixture: ComponentFixture<PayTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTypesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
