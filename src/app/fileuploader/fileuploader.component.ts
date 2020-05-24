import { Component, OnInit } from '@angular/core';
import { ZipService } from '../zip.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private zip:ZipService,
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
}
