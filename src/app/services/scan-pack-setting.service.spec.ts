import { TestBed } from '@angular/core/testing';

import { ScanPackSettingService } from './scan-pack-setting.service';

describe('ScanPackSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanPackSettingService = TestBed.get(ScanPackSettingService);
    expect(service).toBeTruthy();
  });
});
