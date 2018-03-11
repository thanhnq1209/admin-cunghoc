import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { TypeExamQuestionComponent } from './type-exam-question/type-exam-question.component';
import { CreateExamQuestionsComponent } from './create-exam-questions/create-exam-questions.component';
import { TypeLessionComponent } from './type-lession/type-lession.component';
import { CreateLessionComponent } from './create-lession/create-lession.component';
import { LoginComponent } from './login/login.component';
import { LessionsComponent } from './lessions/lessions.component';
import { CreatePracticeComponent } from './create-practice/create-practice.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'exam-questions', component: ExamQuestionsComponent },
    { path: 'type-exam-question', component: TypeExamQuestionComponent },
    { path: 'create-exam-questions', component: CreateExamQuestionsComponent },
    { path: 'type-lession', component: TypeLessionComponent },
    { path: 'create-lession', component: CreateLessionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lessions', component: LessionsComponent },
    { path: 'create-practice-lession', component: CreatePracticeComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);