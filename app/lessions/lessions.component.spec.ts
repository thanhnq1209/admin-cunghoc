import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionsComponent } from './lessions.component';

describe('LessionsComponent', () => {
  let component: LessionsComponent;
  let fixture: ComponentFixture<LessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
