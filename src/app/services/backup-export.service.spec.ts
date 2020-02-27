import { TestBed } from '@angular/core/testing';

import { BackupExportService } from './backup-export.service';

describe('BackupExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackupExportService = TestBed.get(BackupExportService);
    expect(service).toBeTruthy();
  });
});
