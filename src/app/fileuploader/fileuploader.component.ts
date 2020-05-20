import { Component, OnInit } from '@angular/core';
import {PostfileService} from '../postfile.service'
import {GetinfoService} from '../getinfo.service'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {

  constructor(
    private postfileserv:PostfileService,
    private http:HttpClient,
    private getinfo:GetinfoService,
  ) { }

  ngOnInit(): void {
    
  }
  files: any = [];
 
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index]; 
      this.files.push(element.name);
      this.getinfo.getShippingPrices();
      const file :File = event.item(index);
      let formData = new FormData();
      formData.append('firstName', 'Joele');
      formData.append('lastName', 'Smith4');
      this.http.get('/assets/shipping.json').subscribe(
        res => {
          console.log(res);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });
      this.http.post('/assets/shipping.json', formData).subscribe(
        res => {
          console.log(res);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
     
    }  
  }

  uploadFileToActivity() {
    
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}
