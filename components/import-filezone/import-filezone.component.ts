import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-import-filezone',
  templateUrl: './import-filezone.component.html',
  styleUrls: ['./import-filezone.component.scss']
})
export class ImportFilezoneComponent implements OnInit, OnChanges {
  @Input()
  loading: boolean;

  @Input()
  value: File = null;

  @Output()
  onSelect: EventEmitter<File> = new EventEmitter<File>();

  @Output()
  onRemove: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onStartImport: EventEmitter<File> = new EventEmitter<File>();

  formGroup: FormGroup;

  ngOnInit(): void {
    this.createFormControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formGroup && this.formGroup.get('uploadFile').value !== this.value) {
      this.formGroup.get('uploadFile').setValue(this.value);
    }
  }

  createFormControl() {
    this.formGroup = new FormGroup({
      uploadFile: new FormControl(this.value),
    });
  }

  select(event) {
    this.formGroup.controls.uploadFile.setValue(event.addedFiles[0]);
    this.onSelect.emit(this.formGroup.getRawValue().uploadFile);
  }

  remove(event) {
    this.formGroup.controls.uploadFile.setValue(null);
    this.onRemove.emit();
  }

  startImport() {
    this.loading = true;
    const file = this.formGroup.value.uploadFile;
    this.onStartImport.emit(file);
  }

}


