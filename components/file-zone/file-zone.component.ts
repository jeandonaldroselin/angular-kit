import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FileZoneItem } from './interfaces/file-zone.model';
import { CommonModule } from '@angular/common';
import { FileZoneAddComponent } from './file-zone-add/file-zone-add.component';
import { FileZoneExistComponent } from './file-zone-exist/file-zone-exist.component';

@Component({
  selector: 'app-file-zone',
  templateUrl: './file-zone.component.html',
  styleUrls: ['./file-zone.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [
    CommonModule,
    FileZoneAddComponent,
    FileZoneExistComponent,
    ReactiveFormsModule
  ]
})
export class FileZoneComponent implements OnInit, OnChanges {

  @Output()
  private onChoose = new EventEmitter<any>();

  @Output()
  private onDelete = new EventEmitter<any>();

  @Output()
  private onChange = new EventEmitter<Array<FileZoneItem>>();

  @Input()
  files: Array<FileZoneItem> = [];

  @Input()
  accept: string = '*';

  @Input()
  disabled: boolean = false;

  @Input()
  confirmDelete: boolean = false;

  @Input()
  multiple: boolean = true;

  @Input()
  maxFileSize: number = 1000000;

  @Input()
  control: AbstractControl<Array<FileZoneItem>>;
  
  localFiles: Array<FileZoneItem> = [];

  @ViewChild('fileZone') fileZone!: ElementRef;

  newFilesIndex = 0;

  ngOnInit(): void {
    this.setFiles(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFiles(false);
  }

  setFiles(initial: boolean = false) {
    const value = this.control.value;
    if(value) {
      this.localFiles = value;
      this.scrollToEndOfAttachments();
      if(initial === true) {
        this.newFilesIndex = value.length;
      }
    }
  }

  delete(data: any, indexOfFile): boolean {
    if(this.disabled) { return false; }
    let updatedValue = this.localFiles;
    updatedValue = updatedValue.filter((value: FileZoneItem, index: number) => index !== indexOfFile);
    this.localFiles = updatedValue;
    this.control.setValue(updatedValue);
    this.onChange.emit(this.localFiles);
    this.onDelete.emit(data);
    return true;
  }

  choose(data: FileZoneItem[]): boolean {
    if(this.disabled) { return false; }
    data.forEach(item => {
      const updatedValue = this.localFiles;
      item.index = this.newFilesIndex;
      updatedValue.push(item);
      this.localFiles = updatedValue;
      this.control.setValue(updatedValue);
      this.scrollToEndOfAttachments();
      this.onChange.emit(this.localFiles);
      this.onChoose.emit(data);
      this.newFilesIndex = this.newFilesIndex + 1;
    });
    return true;
  }

  scrollToEndOfAttachments(): void {
    setTimeout(() =>  {
      this.fileZone.nativeElement.scrollLeft += 750;
    }, 200);
  }

}

