import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './components/course/course.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { VideoComponent } from './components/video/video.component';
import { AddEditCourseComponent } from './components/course/add-edit-course/add-edit-course.component';
import { ShowCourseComponent } from './components/course/show-course/show-course.component';
import { AddEditLessonComponent } from './components/lesson/add-edit-lesson/add-edit-lesson.component';
import { ShowLessonComponent } from './components/lesson/show-lesson/show-lesson.component';
import { AddEditVideoComponent } from './components/video/add-edit-video/add-edit-video.component';
import { ShowVideoComponent } from './components/video/show-video/show-video.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    CourseComponent,
    LessonComponent,
    VideoComponent,
    AddEditCourseComponent,
    ShowCourseComponent,
    AddEditLessonComponent,
    ShowLessonComponent,
    AddEditVideoComponent,
    ShowVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
