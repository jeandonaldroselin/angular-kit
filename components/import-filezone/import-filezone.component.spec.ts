import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImportFilezoneComponent} from './import-filezone.component';
import {NgxDropzoneModule} from 'ngx-dropzone';

describe('ImportFilezoneComponent', () => {
  let component: ImportFilezoneComponent;
  let fixture: ComponentFixture<ImportFilezoneComponent>;
  const fakeFile = new File([], 'MyFIle.png');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDropzoneModule],
      declarations: [ImportFilezoneComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFilezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('select', () => {
    it('should select a file and fill the uploadFile field', () => {
      // Give
      component.formGroup.patchValue({uploadFile: null});
      // When
      (component as any).select({ addedFiles: [fakeFile] });
      // Then
      expect(component.formGroup.get('uploadFile').value).toEqual(fakeFile);
    });
  });

  describe('remove', () => {
    it('should select a file and fill the uploadFile field', () => {
      // Give
      component.formGroup.patchValue({uploadFile: fakeFile});
      // When
      (component as any).remove();
      // Then
      expect(component.formGroup.get('uploadFile').value).toEqual(null);
    });
  });
});
