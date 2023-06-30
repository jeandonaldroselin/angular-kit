import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FileZoneAddComponent } from './file-zone-add.component';

fdescribe('FileZoneAddComponent', () => {
  let component: FileZoneAddComponent;
  let fixture: ComponentFixture<FileZoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileZoneAddComponent ],
      imports: [
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileZoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if open is called when component is enabled', () => {
    // Given
    component.disabled = false;
    // When
    const result = component.open();
    // Then
    expect(result).toBeTruthy();
  });

  it('should return true if open is called when component is enabled', () => {
    // Given
    component.disabled = false;
    // When
    const result = component.open();
    // Then
    expect(result).toBeTruthy();
  });

  it('should return false if open is called when component is disabled', () => {
    // Given
    component.disabled = true;
    // When
    const result = component.open();
    // Then
    expect(result).toBeFalsy();
  });

  it('should call transform when component and sanitize an url', () => {
    // Given
    component.disabled = true;
    const input: string = 'mySanitizedUrl';
    const output: string = 'mySanitizedUrl';
    const bypassSecurityTrustResourceUrl = spyOn(component.domSanitizer, 'bypassSecurityTrustResourceUrl')
    .and
    .returnValue(output);
    // When
    component.transform(input);
    // Then
    expect(bypassSecurityTrustResourceUrl).toHaveBeenCalledTimes(1);
    expect(bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(input);
  });

  it('should return true if choose is called when component is enabled and provided files is not empty', () => {
    // Given
    const event: Event = { target: { files: [new File([], 'fileName')] } as any } as Event;  
    // When
    const result = component.choose(event);
    // Then
    expect(result).toBeTruthy();
  });

  it('should return false if choose is called when component is disabled', () => {
    // Given
    component.disabled = true;
    const event: Event = { target: { files: [new File([], 'fileName')] } as any } as Event;  
    // When
    const result = component.choose(event);
    // Then
    expect(result).toBeFalsy();
  });

  it('should return false if choose is called when provided event has not a valid target', () => {
    // Given
    const event: Event = { target: null as any } as Event;  
    // When
    const result = component.choose(event);
    // Then
    expect(result).toBeFalsy();
  });
});
