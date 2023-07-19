import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsModalComponent } from './filter-products-modal.component';

describe('FilterProductsModalComponent', () => {
  let component: FilterProductsModalComponent;
  let fixture: ComponentFixture<FilterProductsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProductsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
