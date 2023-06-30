import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AioTableComponent } from './aio-table.component';

describe('AioTableComponent', () => {
  let component: AioTableComponent<any>;
  let fixture: ComponentFixture<AioTableComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AioTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
