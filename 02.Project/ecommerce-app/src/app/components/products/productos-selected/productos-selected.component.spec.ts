import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSelectedComponent } from './productos-selected.component';

describe('ProductosSelectedComponent', () => {
  let component: ProductosSelectedComponent;
  let fixture: ComponentFixture<ProductosSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosSelectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
