import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  constructor(private service:AuthService) { }
  CourseList: any = [];
  ModalTitle = "";
  ActivateAddEditCourseComp: boolean = false;
  Course: any;
  CourseIdFilter = "";
  CourseNameFilter = "";
  CourseListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshCourseList();
  }

  addClick() {
    this.Course = {
      CoursetId: "0",
      CourseName: ""
    }
    this.ModalTitle = "Add Course";
    this.ActivateAddEditCourseComp = true;
  }
  editClick(item: any) {
    this.Course = item;
    this.ModalTitle = "Edit Course";
    this.ActivateAddEditCourseComp = true;
  }
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteCourse(item.CourseId).subscribe(data => {
        alert(data.toString());
        this.refreshCourseList();
      })
    }
  }
  closeClick() {
    this.ActivateAddEditCourseComp = false;
    this.refreshCourseList();
  }
  refreshCourseList() {
    this.service.getCoursesList().subscribe(data => {
      this.CourseList = data;
      this.CourseListWithoutFilter = data;
    });
  }
  sortResult(prop: any, asc: any) {
    this.CourseList = this.CourseListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }
  FilterFn() {
    var CourseIdFilter = this.CourseIdFilter;
    var CourseNameFilter = this.CourseNameFilter;

    this.CourseList = this.CourseListWithoutFilter.filter(
      function (el: any) {
        return el.CourseId.toString().toLowerCase().includes(
          CourseIdFilter.toString().trim().toLowerCase()
        ) &&
          el.CourseName.toString().toLowerCase().includes(
            CourseNameFilter.toString().trim().toLowerCase())
      }
    );
  }

}
