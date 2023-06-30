import {NgModule} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {ImportFilezoneComponent} from './import-filezone.component';
import {CommonModule} from '@angular/common';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    NgxDropzoneModule
  ],
  entryComponents: [ImportFilezoneComponent],
  declarations: [ImportFilezoneComponent],
  exports: [ImportFilezoneComponent]
})
export class ImportFilezoneModule {}


