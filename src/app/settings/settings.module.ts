import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    SettingsRoutingModule,
    CKEditorModule
  ]
})
export class SettingsModule { }
