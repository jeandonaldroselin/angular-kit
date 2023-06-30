import { Component, EventEmitter, ElementRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileZoneItem } from '../interfaces/file-zone.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-zone-add',
  templateUrl: './file-zone-add.component.html',
  styleUrls: ['./file-zone-add.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class FileZoneAddComponent {

  @Output()
  private onChoose = new EventEmitter<FileZoneItem[]>();

  @Input()
  accept: string = '*';

  @Input()
  disabled: boolean = false;

  @Input()
  multiple: boolean = false;

  @Input()
  maxFileSize: number = 1000000;

  @ViewChild('file') file!: ElementRef;

  constructor(public domSanitizer: DomSanitizer) { }

  open(): boolean {
    if(this.disabled) { return false; }
    this.file.nativeElement.click();
    return true;
  }

  transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  choose($event: Event): boolean {
    if(this.disabled) { return false; }
    var target = $event.target as HTMLInputElement;
    const files = target ? target.files : null;
    if(files != null) {
      const chosenFiles: FileZoneItem[] = [];
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        const extensionRegex = /(?:\.([^.]+))?$/;
        const extension = extensionRegex.exec(file?.name);
        chosenFiles.push({ name: file.name, previewUrl: this.transform(URL.createObjectURL(file)), extension: extension ? extension[0]:'', mimeType: file.type, file });
      }
      this.onChoose.emit(chosenFiles);
      this.file.nativeElement.value = null;
      return true;
    }
    return false;
  }

}

