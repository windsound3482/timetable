import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
import { CalendarservService } from './calendarserv.service';
import { FareservService } from './fareserv.service';
import { StopservService } from './stopserv.service';
import { TimetableservService } from './timetableserv.service';
@Injectable({
  providedIn: 'root'
})
export class AllfileService {
  
  agencylist:string[][]=[];
  feedinfo:string[][]=[];
  shapetable:string[][]=[];
  attribution:string[][]=[];
  translation:string[][]=[];
  public setFile(file:Blob,filename:string) {
    let items:string[][]=[]; 
    var reader:FileReader = new FileReader();
    reader.onload = (progressEvent) => {
  
      // By lines
      var lines = (reader.result as string).replace(/\r\n/g, "\n").split("\n");
      for(var line = 0; line < lines.length; line++){
        let tempstring:string[]=[];
        let flag=false;
        let templine:string=lines[line] as string;
        let tempitem:string="";
        for (var i=0;i<templine.length;i++)
        {
          if (templine[i]=='"')
          {
            flag=!flag;
          }
          else
          if (templine[i]==',')
          {
            if (!flag)
            {
              tempstring.push(tempitem);
              tempitem="";
            }
            else
              tempitem=tempitem.concat(templine[i]);
          }
          else
          tempitem=tempitem.concat(templine[i]);
        }
        tempstring.push(tempitem);
        items.push(tempstring);
      }
    };
    reader.readAsText(file);
    //set file to each special container
    {
      if (filename==="agency.txt")
        this.agencylist=items;
      if (filename==="feed_info.txt")
        this.feedinfo=items;

      if (filename==="shapes.txt")
        this.shapetable=items;
      
      if (filename==="attributions.txt")
        this.attribution=items;

      if (filename==="translations.txt")
        this.translation=items;

      if (filename==="calendar.txt")
      {
        this.calendar.setcalender(items);
        this.calendar.setmode(true);
      }
      if (filename==="calendar_dates.txt")
        this.calendar.setexp(items);
      
      if (filename==="fare_attributes.txt") 
        this.fare.setfareAttr(items);
      
      if (filename==="fare_rules.txt") 
        this.fare.setfareRule(items);
      
      if (filename==="levels.txt")
        this.stop.setlevel(items);

      if (filename==="stops.txt")
        this.stop.setstop(items);

      if (filename==="transfers.txt")
        this.stop.settransfer(items);

      if (filename==="trips.txt")
        this.timetable.settrip(items );

      if (filename==="frequencies.txt")
        this.timetable.setfreq(items);

      if (filename==="routes.txt")
        this.timetable.setroute(items);
    }
    
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

  public getshapeTable(){
    return this.shapetable;
  }
  public setshapeTable(file:string[][]){
    this.shapetable=file;
  }

  public getattribution(){
    return this.attribution;
  }
  public setattribution(file:string[][]){
    this.attribution=file;
  }
  
  public gettranslation(){
    return this.translation;
  }
  public settranslation(file:string[][]){
    this.translation=file;
  }
  
  constructor(
    private calendar:CalendarservService,
    private fare:FareservService,
    private stop:StopservService ,
    private timetable: TimetableservService,
  ) {
    this.agencylist=[["agency_id","agency_name","agency_url","agency_timezone"]];
    this.feedinfo=[["feed_publisher_name","feed_publisher_url","feed_lang"]];
    this.shapetable=[["shape_id","shape_pt_lat","shape_pt_lon","shape_pt_sequence"]];
    this.attribution=[["organization_name"]];
    this.translation=[["table_name","field_name","language","translation","record_id","record_sub_id","field_value"]];
  }
}
