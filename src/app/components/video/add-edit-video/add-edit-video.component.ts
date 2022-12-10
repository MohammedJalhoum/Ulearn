import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { lesson } from 'src/app/shared/lesson';
import { video } from 'src/app/shared/video';

@Component({
  selector: 'app-add-edit-video',
  templateUrl: './add-edit-video.component.html',
  styleUrls: ['./add-edit-video.component.css']
})
export class AddEditVideoComponent implements OnInit {

  constructor(private service: AuthService) { }
  @Input() video: any;
  VideoId = "";
  VideoName = "";
  Lesson = "";
  Id = "";
  LessonList: lesson[] = [];

  ngOnInit(): void {
    this.loadVideoList();
  }
  loadVideoList() {

    this.service.getAllCourseNames().subscribe((data: any) => {
      this.LessonList = data;

      this.VideoId = this.video.videoId;
      this.VideoName = this.video.LessonName;
      this.Lesson = this.video.Lesson;
      this.Id = this.video.Id;

    });
  }
  addVideo() {
    var val = {
      VideoId: this.VideoId,
      VideoName: this.VideoName,
      Lesson: this.Lesson,
      Id: this.Id,
    };
    this.service.addVideo(val).subscribe(res => {
      alert(res.toString());
    });}
    updateVideo() {
      var val = {
        VideoId: this.VideoId,
        VideoName: this.VideoName,
        Lesson: this.Lesson,
        Id: this.Id,
      };
      this.service.updateVideo(this.Id, video).subscribe(res => {
        alert(res.toString());
      });}

}
