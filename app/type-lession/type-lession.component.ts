import { Component, keyframes, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagerService, LessionService } from '../_services/index';
import * as _ from 'underscore';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-type-lession',
  templateUrl: './type-lession.component.html',
  styleUrls: ['./type-lession.component.css']
})
export class TypeLessionComponent implements OnInit {

  categories: any = [];
  sort: string; page: any; amount: any;
  category: any = {};
  nameBtnCreate: string;
  idUpdate: any;
  isUpdating: boolean;
  allDatas: any = {};
  pager: any = {};
  pagedItems: any[];
  keysearch: string;
  gopage: string;

  constructor(private router: Router, private lessionService: LessionService,
    private pagerService: PagerService) {
    this.sort = 'Name';
    this.page = 0;
    this.amount = 10;
    this.nameBtnCreate = 'Tạo';
    this.isUpdating = false;
    this.keysearch = '';
  }

  ngOnInit() {
    $('#btn-cancel').hide();
    this.loadAllCategories(this.sort, this.page, this.amount, this.keysearch);
  }

  private loadAllCategories(sort: string, page: any, amount: any, keysearch: any) {
    this.lessionService.getAllTypeLession(sort, page, amount, keysearch).subscribe(data => {
      this.categories = data.Data;
      this.pagedItems = data.Data;
      this.allDatas = data;
      this.pager = this.pagerService.getPager(this.allDatas.TotalPage, this.allDatas.TotalRecord, page, this.amount);
      this.page = page;
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.loadAllCategories(this.sort, page - 1, this.amount, this.keysearch);
  }

  CreateCategory() {
    if (this.isUpdating) {
      this.category.Id = this.idUpdate;
      this.lessionService.update(this.category).subscribe(data => {
        this.loadAllCategories(this.sort, this.page, this.amount, this.keysearch);
        this.category.Name = '';
        this.category.Description = '';
        this.isUpdating = false;
        this.nameBtnCreate = 'Tạo';
        $('#btn-cancel').hide();
      });
    } else {
      this.lessionService.createTypeLession(this.category).subscribe(data => {
        this.loadAllCategories(this.sort, this.page, this.amount, this.keysearch);
        this.category.Name = '';
        this.category.Description = '';
      });
    }
  }

  UpdateCategory(item: any) {
    this.category.Name = item.Name;
    this.category.Description = item.Description;
    this.nameBtnCreate = 'Sửa';
    this.idUpdate = item.Id;
    this.isUpdating = true;
    $('#btn-cancel').show();
  }

  cancelUpdate() {
    this.category.Name = '';
    this.category.Description = '';
    this.nameBtnCreate = 'Tạo';
    this.idUpdate = '';
    this.isUpdating = false;
    $('#btn-cancel').hide();
  }

  DeteleCategory(id: any) {
    this.lessionService.delete(id).subscribe(data => {
      this.loadAllCategories(this.sort, this.page, this.amount, this.keysearch);
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
