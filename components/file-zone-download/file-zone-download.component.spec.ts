import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AccessTokenPipe } from '../../pipes/access-token.pipe';

import { FileZoneDownloadComponent } from './file-zone-download.component';

fdescribe('FileZoneDownloadComponent', () => {
  let component: FileZoneDownloadComponent;
  let fixture: ComponentFixture<FileZoneDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileZoneDownloadComponent ],
      imports: [
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AccessTokenPipe, useValue: { transform: () => (new Promise((resolve) => resolve('myFormattedUrl'))) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileZoneDownloadComponent);
    component = fixture.componentInstance;
    component.fileZoneItem = {
      name: 'name',
      downloadUrl: 'downloadUrl',
      previewUrl: 'previewUrl'
  }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when openDeleteDialog is called', () => {
    // Given
    const openDialogOutput: Promise<string> = new Promise((resolve) => resolve('myFormattedUrl'));
    const accessTokenPipeSpyTransform = spyOn(component.accessTokenPipe, 'transform')
    .and
    .returnValue(openDialogOutput);
    // When
    component.download();
    // Then
    expect(accessTokenPipeSpyTransform).toHaveBeenCalledTimes(1);
  });
  
});
