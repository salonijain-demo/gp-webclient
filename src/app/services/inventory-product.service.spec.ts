import { TestBed } from '@angular/core/testing';

import { InventoryProductService } from './inventory-product.service';

describe('InventoryProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryProductService = TestBed.get(InventoryProductService);
    expect(service).toBeTruthy();
  });
});
