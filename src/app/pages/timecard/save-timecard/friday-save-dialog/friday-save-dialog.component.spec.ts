import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridaySaveDialogComponent } from './friday-save-dialog.component';

describe('SubmitDialogComponent', () => {
  let component: FridaySaveDialogComponent;
  let fixture: ComponentFixture<FridaySaveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridaySaveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridaySaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
