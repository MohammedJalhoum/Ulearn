import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { video } from 'src/app/shared/video';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {

  constructor(private service: AuthService) { }
  VideoList: video[]=[];
  ModalTitle = "";
  ActivateAddEditVideoComp: boolean = false;
  video: any;

  ngOnInit(): void {
    this.refreshVideoList();
  }
  addClick() {
    this.video = {
      VideoId:0,
      VideoName:"",
      Description:"",
      Url:"",
      LessonId:""
    }
    this.ModalTitle = "Add Video";
    this.ActivateAddEditVideoComp = true;
  }
  editClick(item: any) {
    this.video = item;
    this.ModalTitle = "Edit Video";
    this.ActivateAddEditVideoComp = true;
  }
  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteVideo(item.VideoId).subscribe(data => {
        alert(data.toString());
        this.refreshVideoList();
      })
    }
  }
  closeClick() {
    this.ActivateAddEditVideoComp = false;
    this.refreshVideoList();
  }
  refreshVideoList() {
    this.service.getVideoList().subscribe(data => {
      this.VideoList = data;
    });
  }

}
