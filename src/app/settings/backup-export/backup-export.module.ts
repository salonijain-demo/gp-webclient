import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupExportRoutingModule } from './backup-export-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BackupExportRoutingModule,
    SharedSideBarModule
  ]
})
export class BackupExportModule { }
