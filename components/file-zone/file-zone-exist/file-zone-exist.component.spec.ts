import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { FileZoneExistComponent } from './file-zone-exist.component';

fdescribe('FileZoneExistComponent', () => {
  let component: FileZoneExistComponent;
  let fixture: ComponentFixture<FileZoneExistComponent>;
  let dialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileZoneExistComponent ],
      imports: [
        MatIconModule,
        NoopAnimationsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatDialogModule,
        ConfirmModalComponent,
        PipeModule
      ],
      providers: [
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of('ok') }) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    const registry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
    // We use `bypassSecurityTrustHtml` exclusively for testing here.
    registry.addSvgIconLiteralInNamespace(
      'mat',
      'delete',
      sanitizer.bypassSecurityTrustHtml('<svg></svg>'),
    );
    dialogService = TestBed.inject(MatDialog);
    // We create the component
    fixture = TestBed.createComponent(FileZoneExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return disabled from delete when the field is disabled', () => {
    // Given
    component.disabled = true;
    component.confirmDelete = true;
    // When
    const result = component.delete();
    // Then
    expect(result).toEqual('disabled');
  });

  it('should return confirmDelete from delete when the field is enabled and confirmDelete is required', () => {
    // Given
    component.disabled = false;
    component.confirmDelete = true;
    // When
    const result = component.delete();
    // Then
    expect(result).toEqual('confirmDelete');
  });

  it('should return emitted from delete when the field is enabled and confirmDelete is not required', () => {
    // Given
    component.disabled = false;
    component.confirmDelete = false;
    // When
    const result = component.delete();
    // Then
    expect(result).toEqual('emitted');
  });

  it('should open a dialog when openDeleteDialog is called', () => {
    // Given
    const openDialogOutput: any = { afterClosed: () => EMPTY };
    const openDialogSpy = spyOn(component.dialog, 'open')
    .and
    .returnValue(openDialogOutput);
    // When
    component.openDeleteDialog();
    // Then
    expect(openDialogSpy).toHaveBeenCalledTimes(1);
  });

  it('should return true from isDisplayable when the attachment is an image (except tiff)', () => {
    // Given
    component.data = {
      name: 'myImage',
      previewUrl: 'previewUrl',
      mimeType: 'image'
    };
    // When
    const result = component.isDisplayable();
    // Then
    expect(result).toBeTruthy();
  });

  it('should return false from isDisplayable when the attachment is a tiff image', () => {
    // Given
    component.data = {
      name: 'myImage',
      previewUrl: 'previewUrl',
      mimeType: 'image/tiff'
    };
    // When
    const result = component.isDisplayable();
    // Then
    expect(result).toBeFalsy();
  });

  it('should return false from isDisplayable when the attachment is not an image', () => {
    // Given
    component.data = {
      name: 'myImage',
      previewUrl: 'previewUrl',
      mimeType: 'application/pdf'
    };
    // When
    const result = component.isDisplayable();
    // Then
    expect(result).toBeFalsy();
  });
});
