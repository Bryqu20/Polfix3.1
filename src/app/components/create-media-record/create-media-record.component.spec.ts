import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMediaRecordComponent } from './create-media-record.component';

describe('CreateMediaRecordComponent', () => {
  let component: CreateMediaRecordComponent;
  let fixture: ComponentFixture<CreateMediaRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMediaRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMediaRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
