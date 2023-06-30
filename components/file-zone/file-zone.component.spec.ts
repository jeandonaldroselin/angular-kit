import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileZoneItem } from './interfaces/file-zone.model';
import { FileZoneAddComponent } from './file-zone-add/file-zone-add.component';
import { FileZoneExistComponent } from './file-zone-exist/file-zone-exist.component';

import { FileZoneComponent } from './file-zone.component';

describe('FileZoneComponent', () => {
  let component: FileZoneComponent;
  let fixture: ComponentFixture<FileZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileZoneComponent ],
      imports: [
        FileZoneAddComponent,
        FileZoneExistComponent,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should choose a fileZoneItem properly', () => {
    // Given
    component.localFiles = [];
    const initialFileLength = component.localFiles.length;
    const newFile = new File([new Blob()], 'example_file.jpeg', { lastModified: 1234567, type: 'image/jpeg' });
    const newFileZoneItem: FileZoneItem = {
        name: 'example_file.jpeg',
        previewUrl: 'previewUrl',
        mimeType: 'image/jpeg',
        file: newFile,
    };
    // When
    component.choose([newFileZoneItem]);
    // Then
    expect(initialFileLength).toEqual(0);
    expect(component.localFiles.length).toEqual(1);
    expect(component.localFiles[0]).toEqual(newFileZoneItem);
  });
});
