import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileZoneItem } from '../interfaces/file-zone.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-file-zone-exist',
  templateUrl: './file-zone-exist.component.html',
  styleUrls: ['./file-zone-exist.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    ConfirmModalComponent,
    PipeModule
  ]
})
export class FileZoneExistComponent {

  @Output()
  private onDelete = new EventEmitter<FileZoneItem>();

  @Input()
  disabled: boolean = false;

  @Input()
  confirmDelete: boolean = false;

  @Input()
  public data!: FileZoneItem;
  
  constructor(public dialog: MatDialog) { }

  delete(): 'disabled'|'confirmDelete'|'emitted' {
    let output: 'disabled'|'confirmDelete'|'emitted';
    if(this.disabled) {
      output = 'disabled';
    } else if(this.confirmDelete) {
      this.openDeleteDialog();
      output = 'confirmDelete';
    } else {
      this.onDelete.emit(this.data);
      output = 'emitted';
    }
    return output;
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '466px',
      height: '195px',
      data: {
        title: 'Suppression de la pièce jointe',
        text: 'Si vous confirmez, la pièce jointe sera supprimée à l\'enregistrement du ticket.'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'ok') {
          this.onDelete.emit(this.data);
      }
    });
  }

  isDisplayable(): boolean {
    return this.data?.mimeType?.includes('image') && !this.data?.mimeType?.includes('tiff');
  }

}
