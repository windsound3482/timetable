import { Injectable } from '@angular/core';
import { AllfileService } from './allfile.service';
import * as JSZip from 'jszip';
import * as fs from 'fs'
import * as FileSaver from 'file-saver';
import { zip } from 'rxjs';
import { CalendarservService } from './calendarserv.service';
import { FareservService } from './fareserv.service';
import { StopservService } from './stopserv.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  jszip = new JSZip();
  constructor(
    private allfile:AllfileService,
    private fare:FareservService,
    private calen:CalendarservService,
    private stop:StopservService,
  ) { 
    
  }

  public   getZipContent (file): Array<string>{ 
    let files:Array<string>=[];
    this.jszip=new JSZip();
    this.calen.setcalender([["service_id","monday","tuesday","wednesday","thursday",
    "friday","saturday","sunday","start_date","end_date"]]);
    this.calen.setexp([["service_id","date","exception_type"]]);
    this.jszip.loadAsync(file).then((zip) => {
       
        zip.forEach((relativePath, defile) => {
          defile.async("blob").then((data)=> {
            this.allfile.setFile(data,defile.name);
          });
          files.push(relativePath.concat(' has been added'));
        });
        
      });
    if (this.jszip.file("calendar.txt")==null)
    {
      this.calen.setmode(false);
    }
    return files;
  }

  public downloadFile()
  {
    this.jszip=new JSZip();
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
    
    temp=this.allfile.gettranslation();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("translations.txt",tempstr);
    }

    let temp1=this.allfile.getfeedinfo();
    if ((temp.length>1) || (temp1.length>1))
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }

      this.jszip.file("feed_info.txt",tempstr);
    }
    temp=this.allfile.getshapeTable();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("shapes.txt",tempstr);
    }

    temp=this.allfile.getattribution();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("attributions.txt",tempstr);
    }

    if (this.calen.getmode()==true)
    {
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
    }
    temp=this.calen.getexp();
    if (this.calen.getmode()!=true || temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("calendar_dates.txt",tempstr);
    }


    temp=this.fare.getfareAttr();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("fare_attributes.txt",tempstr);
    }

    temp=this.fare.getfareRule();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("fare_rules.txt",tempstr);
    }

    temp=this.stop.getstop();
    if (temp.length>1)
    {
      tempstr ='';
      temprow=temp.length;
      for (var i=0;i<temprow;i++)
      {
        let tempstrr:string[]=temp[i];
        tempstr=tempstr.concat(tempstrr.toString());
        tempstr=tempstr.concat('\n');
      }
      this.jszip.file("stops.txt",tempstr);
    }
    
    this.jszip.generateAsync({type:"blob"}).then((blob) => {
      FileSaver.saveAs(blob, "hello.zip");
    });
  }
 
}
