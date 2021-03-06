import { Injectable } from '@angular/core';
import { AllfileService } from './allfile.service';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

import { CalendarservService } from './calendarserv.service';
import { FareservService } from './fareserv.service';
import { StopservService } from './stopserv.service';
import { TimetableservService } from './timetableserv.service';


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
    private timetable:TimetableservService ,
  ) { 
    
  }


  private getfile(temp:string[][],filename:string)
  {
    let tempstr:string ='';
    let temprow=temp.length;
    

    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      if (tempstrr)
        tempstrr=tempstrr.map(x=>x.toString().replace(/"/g, '""')).map(x => x='"'.concat(x,'"'));
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file(filename,tempstr);

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
    return files;
  }

  public downloadFile()
  {
    this.jszip=new JSZip();
    let temp:string[][]=this.allfile.getagencyList();
    this.getfile(temp,"agency.txt")
    
    temp=this.allfile.gettranslation();
    if (temp.length>1)
    {
      this.getfile(temp,"translations.txt");
    }

    let temp1=this.allfile.getfeedinfo();
    if ((temp.length>1) || (temp1.length>1))
    {
      this.getfile(temp1,"feed_info.txt");
    }
    temp=this.allfile.getshapeTable();
    if (temp.length>1)
    {
      this.getfile(temp,"shapes.txt");
    }

    temp=this.allfile.getattribution();
    if (temp.length>1)
    {
      this.getfile(temp,"attributions.txt");
    }

  
    temp=this.calen.getcalender();
    this.getfile(temp,"calendar.txt");
   
    temp=this.calen.getexp();
    if (temp.length>1)
    {
      this.getfile(temp,"calendar_dates.txt");
    }

    temp=this.fare.getfareAttr();
    if (temp.length>1)
    {
      this.getfile(temp,"fare_attributes.txt");
    }

    temp=this.fare.getfareRule();
    if (temp.length>1)
    {
      this.getfile(temp,"fare_rules.txt");
    }

    temp=this.stop.getstop();
    this.getfile(temp,"stops.txt");
    
    temp=this.timetable.gettrip();
    this.getfile(temp,"trips.txt");


    temp=this.timetable.getfreq();
    if (temp.length>1)
    {
      this.getfile(temp,"frequencies.txt");
    }

    temp=this.stop.getlevel();
    if (temp.length>1)
    {
      this.getfile(temp,"levels.txt");
    }

    temp=this.stop.gettransfer();
    if (temp.length>1)
    {
      this.getfile(temp,"transfers.txt");
    }

    temp=this.stop.getpathway();
    if (temp.length>1)
    {
      this.getfile(temp,"pathways.txt");
    }

    temp=this.timetable.getroute();
    this.getfile(temp,"routes.txt");

    temp=this.timetable.getstoptimes();
    this.getfile(temp,"stop_times.txt");

    this.jszip.generateAsync({type:"blob"}).then((blob) => {
      FileSaver.saveAs(blob, "hello.zip");
    });
  }
 
}
