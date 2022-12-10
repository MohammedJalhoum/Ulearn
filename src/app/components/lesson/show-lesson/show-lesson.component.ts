import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { lesson } from 'src/app/shared/lesson';

@Component({
  selector: 'app-show-lesson',
  templateUrl: './show-lesson.component.html',
  styleUrls: ['./show-lesson.component.css']
})
export class ShowLessonComponent implements OnInit {

  constructor(private service: AuthService) { }

  LessonList: lesson[]=[];
  ModalTitle = "";
  ActivateAddEditLessonComp: boolean = false;
  lesson: any;

  ngOnInit(): void {
    this.refreshLessonList();
  }

  addClick() {
    this.lesson = {
      LessonId: "0",
      LessonName: "",
      Description: "",
      courseId: ""
    }
    this.ModalTitle = "Add Lesson";
    this.ActivateAddEditLessonComp = true;
  }

  editClick(item: any) {
    this.lesson = item;
    this.ModalTitle = "Edit Lesson";
    this.ActivateAddEditLessonComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteLesson(item.LessonId).subscribe(data => {
        alert(data.toString());
        this.refreshLessonList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditLessonComp = false;
    this.refreshLessonList();
  }

  refreshLessonList() {
    this.service.getLessonList().subscribe(data => {
      this.LessonList = data;
    });
  }
}
