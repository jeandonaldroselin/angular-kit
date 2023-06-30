import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalChoiceEnum, ConfirmModalData } from './interfaces/confirm-modal.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmModalComponent {

  confirmModalChoiceEnum = ConfirmModalChoiceEnum;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmModalData) {}

}
