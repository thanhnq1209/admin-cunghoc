import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// service
import {
  PagerService, CategoryService, AuthService,
  ConstantService, ExamQuestionsService, LessionService,
  LocalStorageService
} from './_services/index';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';

import { routing } from './app.routing';
import { TypeExamQuestionComponent } from './type-exam-question/type-exam-question.component';
import { CreateExamQuestionsComponent } from './create-exam-questions/create-exam-questions.component';
import { LessionsComponent } from './lessions/lessions.component';
import { TypeLessionComponent } from './type-lession/type-lession.component';
import { CreateLessionComponent } from './create-lession/create-lession.component';
import { LoginComponent } from './login/login.component';
import { CreatePracticeComponent } from './create-practice/create-practice.component';

// library
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamQuestionsComponent,
    TypeExamQuestionComponent,
    CreateExamQuestionsComponent,
    LessionsComponent,
    TypeLessionComponent,
    CreateLessionComponent,
    LoginComponent,
    CreatePracticeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [
    PagerService, CategoryService,
    ConstantService, ExamQuestionsService,
    LessionService, AuthService, LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
