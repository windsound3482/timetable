import { Injectable } from '@angular/core';
import { AllfileService } from './allfile.service';
import * as JSZip from 'jszip';
import * as fs from 'fs'
import * as FileSaver from 'file-saver';
import { zip } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarservService } from './calendarserv.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  jszip = new JSZip();
  constructor(
    private allfile:AllfileService,
    private http: HttpClient,
    private calen:CalendarservService,
  ) { 
    this.http.get('../../assets/sample-feed.zip',{responseType: 'arraybuffer'}).subscribe(
      (files) => {
        this.jszip.loadAsync(files).then((zip) => {
          
          zip.forEach((relativePath, defile) => {
            defile.async("blob").then((data)=> {
              this.allfile.setFile(data,defile.name);
            });
            
          });
          
        });
      }
    );
  }

  public   getZipContent (file): Array<string>{ 
    let files:Array<string>=[];
    this.jszip.loadAsync(file).then((zip) => {
       
        zip.forEach((relativePath, defile) => {
          defile.async("blob").then((data)=> {
            this.allfile.setFile(data,defile.name);
          });
          files.push(relativePath.concat(' has been added'));
        });
        
      });
      return files;
  }

  public downloadFile()
  {
    let temp:string[][]=this.allfile.getagencyList();
    let tempstr:string ='';
    let temprow=temp.length;
    

    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file("agency.txt",tempstr);

    temp=this.allfile.getfeedinfo();
    tempstr ='';
    temprow=temp.length;
    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file("feed_info.txt",tempstr);

    temp=this.calen.getcalender();
    tempstr ='';
    temprow=temp.length;
    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file("calendar.txt",tempstr);

    temp=this.calen.getexp();
    tempstr ='';
    temprow=temp.length;
    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file("calendar_dates.txt",tempstr);

    this.jszip.generateAsync({type:"blob"}).then((blob) => {
      FileSaver.saveAs(blob, "hello.zip");
    });
  }
 
}
