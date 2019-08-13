import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTimecardComponent } from './save-timecard.component';

describe('SaveTimecardComponent', () => {
  let component: SaveTimecardComponent;
  let fixture: ComponentFixture<SaveTimecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTimecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
