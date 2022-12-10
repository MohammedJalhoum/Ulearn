import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { course } from 'src/app/shared/course';
import { lesson } from 'src/app/shared/lesson';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.css']
})
export class AddEditLessonComponent implements OnInit {

  constructor(private service: AuthService) { }
  @Input() lesson: any;
  LessonId = "";
  LessonName = "";
  Course = "";
  Id = "";
  CourseList: course[] = [];

  ngOnInit(): void {
    this.loadLessonList();

  }
  loadLessonList() {

    this.service.getAllCourseNames().subscribe((data: any) => {
      this.CourseList = data;

      this.LessonId = this.lesson.LessonId;
      this.LessonName = this.lesson.LessonName;
      this.Course = this.lesson.Course;
      this.Id = this.lesson.Id;

    });
  }
  addLesson() {
    var val = {
      LessonId: this.LessonId,
      LessonName: this.LessonName,
      Course: this.Course,
      Id: this.Id,
    };
    this.service.addLesson(val).subscribe(res => {
      alert(res.toString());
    });}
    updateLesson() {
      var val = {
        LessonId: this.LessonId,
        LessonName: this.LessonName,
        Course: this.Course,
        Id: this.Id,
      };
  
      this.service.updateLesson(this.Id, lesson).subscribe(res => {
        alert(res.toString());
      });
    }


}
