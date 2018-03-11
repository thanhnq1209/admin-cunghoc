import { Component, keyframes, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagerService, CategoryService, ExamQuestionsService } from '../_services/index';
import * as _ from 'underscore';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-lessions',
  templateUrl: './lessions.component.html',
  styleUrls: ['./lessions.component.css']
})
export class LessionsComponent implements OnInit {

  categories: any = [];
  sort: string; page: any; amount: any;
  allDatas: any = {};
  pager: any = {};
  pagedItems: any[];
  keysearch: string;
  gopage: string;
  questions: any = [];
  examChoosen: any = "";

  constructor(private router: Router, private categoryService: CategoryService,
    private pagerService: PagerService, private examQuestionService: ExamQuestionsService) {
    this.sort = 'Name';
    this.page = 0;
    this.amount = 10;
    this.keysearch = '';
   }

  ngOnInit() {
    this.loadAllPractices(this.sort, this.page, this.amount, this.keysearch);
  }

  private loadAllPractices(sort: string, page: any, amount: any, keysearch: any) {
    this.categoryService.GetAllLession(sort, page, amount, keysearch).subscribe(data => {
      this.categories = data.Data;
      this.pagedItems = data.Data;
      this.allDatas = data;
      this.pager = this.pagerService.getPager(this.allDatas.TotalPage, this.allDatas.TotalRecord, page, this.amount);
      this.page = page;
    });
  }

  showQuestion(exam: any){
    $('#listQueston').modal();
    this.questions = exam.Questions;
    this.examChoosen = exam.Name;
  }

  closeListQuestion(){
    $('#listQueston').modal('hide');
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.loadAllPractices(this.sort, page - 1, this.amount, this.keysearch);
  }

  DeteleCategory(id: any) {
    this.categoryService.delete(id).subscribe(data => {
      this.loadAllPractices(this.sort, this.page, this.amount, this.keysearch);
    });
  }

  gotoPage() {
    if (this.gopage != "") {
      this.setPage(+this.gopage);
    } else {
      this.setPage(1);
    }
  }

  goSearch() {
    this.setPage(1);
  }

}
