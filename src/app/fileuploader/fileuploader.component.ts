import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {

  constructor(
    private http:HttpClient,
    
  ) { }

  ngOnInit(): void {
    
  }
  files: any = [];
 
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index]; 
      this.files.push(element.name);
    }  
  }

  uploadFileToActivity() {
    
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}
