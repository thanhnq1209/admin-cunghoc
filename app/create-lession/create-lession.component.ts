import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { PagerService, LessionService } from '../_services/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppSettings } from '../app.constant';
declare var jquery: any;
declare var $: any;
declare var CKEDITOR: any;

@Component({
   selector: 'app-create-lession',
   templateUrl: './create-lession.component.html',
   styleUrls: ['./create-lession.component.css']
})
export class CreateLessionComponent implements OnInit {
   typeLession: any = [];
   lession: any = {};
   constructor(private lessionService: LessionService, private spinnerService: Ng4LoadingSpinnerService,
      public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   ngOnInit() {
      $('#select2-type-exam').select2();
      this.loadAllTypeLession();
      setTimeout(function () {
         CKEDITOR.replace('DescEditor', {
            language: 'vi',
            // Configure your file manager integration. This example uses CKFinder 3 for PHP.
            filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
            filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?type=Images',
            filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
            filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images'
         });
      }, 500);
   }

   private loadAllTypeLession() {
      this.lessionService.getAllForCreateLession().subscribe(data => {
         this.typeLession = data;
      });
   }

   createLession() {
      this.spinnerService.show();
      var selectedCates = $("#select2-type-exam").val();
      this.lession.TypeLessionId = selectedCates;
      var content = CKEDITOR.instances.DescEditor.getData();
      this.lession.ContentLession = $('<div/>').text(content).html();
      this.lession.ContentLession = this.lession.ContentLession.replace(/\s{2,}/g, '');
      this.lessionService.createLession(this.lession).subscribe(
         data => {
            this.toastr.success('Create lession successfully!');
            this.lession = {};
            CKEDITOR.instances.DescEditor.setData("");
            this.spinnerService.hide();
         }, error => {
            this.spinnerService.hide();
         });
   }

   private previewLession() {
      var content = CKEDITOR.instances.DescEditor.getData();
      this.spinnerService.show();
      var spinner = this.spinnerService;
      setTimeout(function () {
         $('#DescEditorPreview').html(content);
         $('#previewModal').modal();
         spinner.hide();
      }, 1000);
   }

   private closePreview() {
      $('#previewModal').modal('hide');
   }

}
