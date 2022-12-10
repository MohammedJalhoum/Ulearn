import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {

  constructor(private service:AuthService) { }
  @Input() course: any;
  CourseId = "";
  CourseName = "";
  ngOnInit(): void {
    this.CourseId = this.course.CourseId;
    this.CourseName = this.course.CourseName;
  }
  addCourse() {
    var course = {
      CourseId: this.CourseId,
      CourseName: this.CourseName
    };
    this.service.addCourse(course).subscribe(res => {
      alert(res.toString());
    });
  }
  updateCourse() {
    var course = {
      CourseId: this.CourseId,
      CourseName: this.CourseName
    };
    this.service.updateCourse(this.CourseId,this.CourseName).subscribe(res => {
      alert(res.toString());
    });
  }

}
