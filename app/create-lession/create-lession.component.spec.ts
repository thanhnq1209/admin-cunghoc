import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessionComponent } from './create-lession.component';

describe('CreateLessionComponent', () => {
  let component: CreateLessionComponent;
  let fixture: ComponentFixture<CreateLessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
