import { Component, OnInit } from '@angular/core';
import { ZipService } from '../zip.service';
import {transit_realtime} from 'timetable';
import { RealtimeservService } from '../realtimeserv.service';
@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})

export class FileuploaderComponent implements OnInit {

  constructor(
    private zip:ZipService,
    private realtime:RealtimeservService
  ) { }

  ngOnInit(): void {
    
  }
  files: any = [];
  details: Array<Array<string>> = [];
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index]; 
      this.files.push(element.name);
      let detail: Array<string>=this.zip.getZipContent(element);
      this.details.push(detail);
    }  
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.details.splice(index,1);
  }

  realtimefiles: any = [];
  num=null;
  uploadrealtimeFile(event) {
    var reader:FileReader = new FileReader();
    
    reader.onload = (progressEvent) => {
  
      let temparray=reader.result as string;
      let element=Buffer.from(temparray,"ascii");
      var feed =transit_realtime.FeedMessage.decode(element);
      this.realtime.setfeed(feed);
      this.num=feed.entity.length;

    };
   
    reader.readAsArrayBuffer(event[0]);
  }

  
}
