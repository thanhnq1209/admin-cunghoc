import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PagerService, CategoryService, ExamQuestionsService, LessionService } from '../_services/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { error } from 'selenium-webdriver';
import * as XLSX from 'ts-xlsx';
import { AppSettings } from '../app.constant';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-create-practice',
  templateUrl: './create-practice.component.html',
  styleUrls: ['./create-practice.component.css']
})
export class CreatePracticeComponent implements OnInit {
  typeLessions: any = [];
  practice: any = {};
  questions: any = [];
  question: any = {};
  filePractice: File;
  nameFile: string = "";
  isUpdateQuestion: boolean = false;
  updatingQuestion: number;
  linkSampleData: string = AppSettings.API_ENDPOINT_IMAGE + "/Content/Data/dataSample/samplepractice.xlsx";
  constructor(private categoryService: CategoryService, private lessionService: LessionService,
    private spinnerService: Ng4LoadingSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    $('#select2-type-lession').select2();
    this.loadAllTypeLessions();
  }

  private loadAllTypeLessions() {
    this.categoryService.getAllLessionForCreatePratice().subscribe(data => {
      this.typeLessions = data;
    });
  }

  CreateQuestion() {
    this.questions.push(this.question);
    this.question = {};
  }

  CreatePracticeLessions() {
    this.spinnerService.show();
    var selectedCates = $("#select2-type-lession").val();
    this.practice.LessionId = selectedCates;
    this.practice.Questions = this.questions;
    this.lessionService.createPractice(this.practice).subscribe(
      data => {
        this.spinnerService.hide();
        this.practice = {};
        this.questions = [];
        this.toastr.success('Tạo bài tập thành công');
      }, error => {
        this.toastr.error('Có lỗi trong quá trình tạo bài tập, Xin vui lòng thử lại sau!');
      });
  }

  private downloadSample() {
    window.location.href = this.linkSampleData;
  }

  private deleteQuestion(index: number) {
    let q = this.questions[index];
    let item = this.questions.indexOf(q);
    if (item > -1) {
      this.questions.splice(item, 1);
    }
  }

  private updateQuestion(index: number) {
    this.questions[index] = this.question;
    this.isUpdateQuestion = false;
    this.question = {};
    this.toastr.success('Cập nhật câu hỏi thành công!');
  }

  private editQuestion(index: number) {
    this.question = this.questions[index];
    this.isUpdateQuestion = true;
    this.updatingQuestion = index;
    $('html, body').animate({
      scrollTop: $("#page-create-practice").offset().top
    }, 500);
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let file: File = target.files[0];
    this.filePractice = file;
    this.nameFile = this.filePractice.name;
    let data = {};
    let result = [];
    if (target.files.length != 1) throw new Error("Cannot upload multiple files on the entry");
    const reader = new FileReader();
    this.spinnerService.show();
    reader.onload = function (file: any) {
      var wb = XLSX.read(file.target.result, { type: 'binary' });
      wb.SheetNames.forEach((name, index) => {
        if (index == 0) {
          data[name.trim()] = XLSX.utils.sheet_to_json(wb.Sheets[name]);
          result = data[name.trim()];
          return;
        }
      });
    }
    reader.readAsBinaryString(target.files[0]);
    let correctFile = true;
    setTimeout(() => {
      result.forEach(element => {
        if (element.QuestionContent == undefined || element.AnswerA == undefined ||
          element.AnswerB == undefined || element.AnswerC == undefined || element.AnswerD == undefined ||
          element.QuestionContent == "" || element.AnswerA == "" || element.AnswerB == "" || element.AnswerC == "" ||
          element.AnswerD == "") {
          correctFile = false;
          this.spinnerService.hide();
        }
      });
      if (correctFile) {
        result.forEach(element => {
          this.questions.push(element);
        });
        this.spinnerService.hide();
      } else {
        this.toastr.warning("File bài tập định dạng không đúng!", "Oops! Vui lòng kiểm tra file.");
      }
      // clear file
      $('#fileChoosen').val('');
    }, 2000);
  }

}
