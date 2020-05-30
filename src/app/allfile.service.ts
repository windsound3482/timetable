import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
import { CalendarservService } from './calendarserv.service';
@Injectable({
  providedIn: 'root'
})
export class AllfileService {
  
  agencylist:string[][]=[];
  feedinfo:string[][]=[];
  calendarList:string[][]=[];

  public setFile(file:Blob,filename:string) {
    let items:Array<Array<string>>=[]; 
    var reader:FileReader = new FileReader();
    reader.onload = (progressEvent) => {
  
      // By lines
      var lines = (reader.result as string).replace(/"/g,"").replace(/\r\n/g, "\n").split("\n");
      for(var line = 0; line < lines.length; line++){
        items[line]=(lines[line] as string).split(',');
      }
    };
    reader.readAsText(file);
    if (filename==="agency.txt")
      this.agencylist=items;
    if (filename==="feed_info.txt")
      this.feedinfo=items;
    if (filename==="calendar.txt")
      this.calendar.setcalender(items);
    if (filename==="calendar_dates.txt")
      this.calendar.setexp(items);
  }
  //get and set List to every CSV functions
  public getagencyList(){
    return this.agencylist;
  }
  public setagencyList(file:string[][]){
    this.agencylist=file;
  }

  public getfeedinfo(){
    return this.feedinfo;
  }
  public setfeedinfo(file:string[][]){
    this.feedinfo=file;
  }

  
  constructor(
    private calendar:CalendarservService,
  ) {
    this.agencylist=[["agency_id","agency_name","agency_url","agency_timezone","agency_phone","agency_lang"]
      ,["FunBus","The Fun Bus","http://www.thefunbus.org","America/Los_Angeles","(310) 555-0222","en"]];
    this.feedinfo=[["feed_publisher_name","feed_publisher_url","feed_lang","feed_start_date","feed_end_date","feed_version"],
      ["SBB","http://www.sbb.ch/","DE","20191215","20201212","20200519"]];
  }
}
