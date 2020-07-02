import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { RealtimeservService } from '../realtimeserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {transit_realtime} from 'timetable';
import {FormControl} from '@angular/forms';
import { StopPickerComponent } from '../stop-picker/stop-picker.component';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})


export class RealtimeComponent implements OnInit {

  constructor(
    private realtime:RealtimeservService,
  ) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
  value="";
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  currentfeedtime;
  currenttimedate;
  startdatetime;
  enddatetime;

  ngOnInit(): void {
    this.displayedColumns=["entity_id","trip_id","start_time","start_date","schedule_relationship"];
    this.feed=this.realtime.getfeed();
    this.database=[];
    
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        let tempinput=[];
        tempinput.push(entity.id);
        tempinput.push(entity.trip_update.trip.trip_id);
        tempinput.push(entity.trip_update.trip.start_time);
        tempinput.push(entity.trip_update.trip.start_date);
        tempinput.push(entity.trip_update.trip.schedule_relationship);
        this.database.push(tempinput);
      }
    });
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.currentfeedtime=new FormControl(new Date(this.feed.header.timestamp * 1000).toISOString().slice(0, -5));
    this.addmode=false;
    this.currenttimedate=null;
  }
  current;
  displayedStoptimeColumns:string[]=[];
  dataStoptimebase=[];
  dataStoptimeTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) Stoptimepaginator: MatPaginator;

  resetstoptime(){
    this.displayedStoptimeColumns=["stop_sequence","stop_id","arrival_time","departure_date","schedule_relationship","tool"];
    this.dataStoptimebase=[];
          
    this.current.stop_time_update.forEach((stoptime) => {
           
      let tempinput=[];
      tempinput.push(stoptime.stop_sequence);
      tempinput.push(stoptime.stop_id);
      if (!stoptime.arrival)
      {
        stoptime.arrival=transit_realtime.TripUpdate.StopTimeEvent.create();
        stoptime.arrival.time=Date.now().valueOf()/1000;
      }
      if (!stoptime.departure)
      {
        stoptime.departure=transit_realtime.TripUpdate.StopTimeEvent.create();
        stoptime.departure.time=Date.now().valueOf()/1000;
      }
      tempinput.push(new Date(stoptime.arrival.time * 1000).toISOString().slice(0, -5));
      tempinput.push(new Date(stoptime.departure.time * 1000).toISOString().slice(0, -5));
      tempinput.push(stoptime.schedule_relationship);
      this.dataStoptimebase.push(tempinput);
    });

    for (var i=0;i<this.dataStoptimebase.length;i++)
     for (var j=this.dataStoptimebase.length-1;j>i;j--)
      if (this.dataStoptimebase[i][0]>this.dataStoptimebase[j][0])
       {
          let tempstring=this.dataStoptimebase[i].slice();
          this.dataStoptimebase[i]=this.dataStoptimebase[j].slice();
          this.dataStoptimebase[j]=tempstring;
      }
    this.dataStoptimeTable=new MatTableDataSource<string[]>(this.dataStoptimebase);
    this.dataStoptimeTable.paginator = this.Stoptimepaginator;
          
  }

  edit(){
    this.currenttimedate=null;
    this.addmode=true;
    let flag=true;
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        
        if (entity.id == this.value)
        {
          
          flag=false;
         
          this.current.timestamp=Date.now().valueOf()/1000;
          this.currenttimedate=new FormControl(new Date(this.current.timestamp * 1000).toISOString().slice(0, -5));
          this.current=entity.trip_update;
          this.resetstoptime();
          return;
        }
      }
    });
    if (flag==true)
    {
      this.current=transit_realtime.TripUpdate.create({
        trip:transit_realtime.TripDescriptor.create(),
        stop_time_update:[]
      });
      this.feed.entity.push(transit_realtime.FeedEntity.create({
        id:this.value,
        trip_update:this.current
      }));
      console.log("hello");
    }
    
  }

  changtimedate(value)
  {
    this.current.timestamp=new Date(value).valueOf()/1000;
  }

  changfeedtimedate(value)
  {
    console.log(value);
    this.feed.header.timestamp=new Date(value).valueOf()/1000;
    console.log(this.feed.header.timestamp);
  }
  changbegintimedate(value)
  {
    this.currentstop.arrival.time=new Date(value).valueOf()/1000;
  }

  changendtimedate(value)
  {
    this.currentstop.departure.time=new Date(value).valueOf()/1000;
  }
  
  
  editentity(addvalue){
    this.value=addvalue as string;
  }


  
  onSave(stepper){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return false;
      }
    }
    stepper.reset();
    this.realtime.setfeed(this.feed);
    this.ngOnInit();
  }
  feed=null;
  addmode=false;
  addvehicle(){
    this.current.VehicleDescriptor=transit_realtime.VehicleDescriptor.create();
  }
  addarrival(){
    this.currentstop.arrival=transit_realtime.TripUpdate.StopTimeEvent.create();
  }

  adddeparture(){
    this.currentstop.departure=transit_realtime.TripUpdate.StopTimeEvent.create();
  }

  currentstop;
 @ViewChild("stopicker", { static: false }) stoppicker: StopPickerComponent;
 @ViewChild("datetimestopbegin", { static: false }) datetimestopbegin: ElementRef;
 @ViewChild("datetimestopend", { static: false }) datetimestopend: ElementRef;
  addstoptimeinfo(info){
    if (this.currentstop)
      if (!this.checkvalid())
        return;
      else
      {
        this.stoppicker.currentstop="";
        this.datetimestopbegin.nativeElement.value=null;
        this.datetimestopend.nativeElement.value=null;
      }
    this.currentstop=null;
    this.startdatetime=null;
    this.enddatetime=null;
    this.current.stop_time_update.forEach((stoptime) => {
      if ((stoptime.stop_sequence==info[0]) && (stoptime.stop_id==info[1]))
      {
        
        if (stoptime.arrival)
        {
          this.startdatetime=new FormControl(new Date(stoptime.arrival.time * 1000).toISOString().slice(0, -5));
        }
        if (stoptime.departure)
        {
          this.enddatetime=new FormControl(new Date(stoptime.departure.time * 1000).toISOString().slice(0, -5));
        }
        
        this.currentstop=stoptime; 
        this.resetstoptime();
        this.stoppicker.currentstop=stoptime.stop_id;
        return;
      }
    });
   
  }
  checkvalid(){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return false;
      }
    }
    if (!this.currentstop.stop_id){
      window.alert("Stop_id can not be empty!");
      return false;
    }
    return true;
  }
  addaLine()
  {
    if (this.currentstop)
      if (!this.checkvalid())
        return;
      else
      {
        this.stoppicker.currentstop="";
        this.datetimestopbegin.nativeElement.value=null;
        this.datetimestopend.nativeElement.value=null;
      }
    this.currentstop=null;
    let tempinput=transit_realtime.TripUpdate.StopTimeUpdate.create({
      stop_sequence:null,
      stop_id:null,
      arrival:transit_realtime.TripUpdate.StopTimeEvent.create(),
      departure:transit_realtime.TripUpdate.StopTimeEvent.create()
    });
    this.current.stop_time_update.push(tempinput);
    this.currentstop=tempinput;
    this.resetstoptime();
  }

  addroute(routeid){
    this.current.trip.route_id=routeid;
  }

  changestopid(stop){
    this.currentstop.stop_id=stop;
  }
}
