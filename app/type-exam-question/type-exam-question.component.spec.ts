import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExamQuestionComponent } from './type-exam-question.component';

describe('TypeExamQuestionComponent', () => {
  let component: TypeExamQuestionComponent;
  let fixture: ComponentFixture<TypeExamQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeExamQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExamQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
