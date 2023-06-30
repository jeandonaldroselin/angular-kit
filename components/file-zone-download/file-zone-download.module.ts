import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileZoneDownloadComponent } from './file-zone-download.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../pipes/pipe.module';



@NgModule({
  declarations: [
    FileZoneDownloadComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    PipeModule
  ],
  exports: [
    FileZoneDownloadComponent,
  ]
})
export class FileZoneDownloadModule { }
