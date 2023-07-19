import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPickedFormComponent } from './products-picked-form.component';

describe('ProductsPickedFormComponent', () => {
  let component: ProductsPickedFormComponent;
  let fixture: ComponentFixture<ProductsPickedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPickedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPickedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
