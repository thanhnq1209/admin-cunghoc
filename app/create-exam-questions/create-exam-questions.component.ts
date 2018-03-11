import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PagerService, CategoryService, ExamQuestionsService } from '../_services/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-create-exam-questions',
  templateUrl: './create-exam-questions.component.html',
  styleUrls: ['./create-exam-questions.component.css']
})
export class CreateExamQuestionsComponent implements OnInit {
  typeExams: any = [];
  examQuestion: any = {};
  questions: any = [];
  question: any = {};
  constructor(private categoryService: CategoryService, private examQuestionsService: ExamQuestionsService) { }

  ngOnInit() {
    $('#select2-type-exam').select2();
    this.loadAllTypeExams();
  }

  private loadAllTypeExams() {
    this.categoryService.getAllForCreateExam().subscribe(data => {
      this.typeExams = data;
    });
  }

  CreateQuestion() {
    this.questions.push(this.question);
    this.question = {};
  }

  CreateExamQuestion(){
    var selectedCates = $("#select2-type-exam").val();
    this.examQuestion.IdTypeXam = selectedCates;
    this.examQuestion.ListQuestion = this.questions;
    console.log(this.examQuestion);
    this.examQuestionsService.createExamQuestions(this.examQuestion).subscribe(data => {
      
    });
  }


}
