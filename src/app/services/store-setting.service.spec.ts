import { TestBed } from '@angular/core/testing';

import { StoreSettingService } from './store-setting.service';

describe('StoreSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreSettingService = TestBed.get(StoreSettingService);
    expect(service).toBeTruthy();
  });
});
