import { Component, OnInit,ViewChild,ElementRef, ViewChildren} from '@angular/core';
import { RealtimeservService } from '../realtimeserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TimetableservService } from '../timetableserv.service';
import {transit_realtime} from 'timetable';
import {FormControl} from '@angular/forms';
import { StopPickerComponent } from '../stop-picker/stop-picker.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { RouterPickerComponent } from '../router-picker/router-picker.component';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})


export class RealtimeComponent implements OnInit {

  constructor(
    private realtime:RealtimeservService,
    private timetable:TimetableservService 
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
    this.current=null;
    this.currentstop=null;
    this.startatdate=null;
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
        stoptime.arrival.timeMath.round(new Date().getTime()/1000);
      }
      if (!stoptime.departure)
      {
        stoptime.departure=transit_realtime.TripUpdate.StopTimeEvent.create();
        stoptime.departure.time=Math.round(new Date().getTime()/1000);
      }
      if (stoptime.arrival.time)
        tempinput.push(new Date(stoptime.arrival.time * 1000).toISOString().slice(0, -5));
      else
        tempinput.push("Delay:".concat(stoptime.arrival.delay).concat("s"));
      if (stoptime.departure.time)
        tempinput.push(new Date(stoptime.departure.time * 1000).toISOString().slice(0, -5));
      else
        tempinput.push("Delay:".concat(stoptime.departure.delay).concat("s"));
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
  startatdate=null;
  edit(){
    this.currenttimedate=null;
    this.addmode=true;
    let flag=true;
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        
        if (entity.id == this.value)
        {
          
          flag=false;
          if (!entity.trip_update.timestamp)
            entity.trip_update.timestamp=Math.round(new Date().getTime()/1000);
          this.currenttimedate=new FormControl(new Date(entity.trip_update.timestamp * 1000).toISOString().slice(0, -5));
          this.startatdate=new FormControl(new Date(entity.trip_update.trip.start_date));
          this.current=entity.trip_update;
          this.resetstoptime();
          return;
        }
      }
    });
    if (flag==true)
    {
      this.startatdate=new FormControl(null);
      this.currenttimedate=new FormControl(new Date(Math.round(new Date().getTime()/1000) * 1000).toISOString().slice(0, -5));
      this.current=transit_realtime.TripUpdate.create({
        trip:transit_realtime.TripDescriptor.create(),
        stop_time_update:[],
        timestamp:Math.round(new Date().getTime()/1000)
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
    if (this.currentstop)
      if (!this.checkvalid())
        return;
    stepper.reset();
    this.realtime.setfeed(this.feed);
    this.ngOnInit();
  }

  Deleteline(){
    let index=0;
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        if (entity.trip_update==this.current)
          this.feed.entity.splice(index,1);
          return;
      }
      {
        index++;
      }
    })
  }

  onDelete(stepper){
    this.Deleteline();
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
        if (this.stoppicker)
          this.stoppicker.currentstop=stoptime.stop_id;
        return;
      }
    });
   
  }

  deletestoptimeinfo(element){
    this.addstoptimeinfo(element);
    let index=this.current.stop_time_update.indexOf(this.currentstop);
    this.current.stop_time_update.splice(index,1);
    this.resetstoptime();
    this.currentstop=null;
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

  checkout(){
    if (this.currentstop)
      if (!this.checkvalid())
        return;
      else
      {
        this.stoppicker.currentstop="";
        this.datetimestopbegin.nativeElement.value=null;
        this.datetimestopend.nativeElement.value=null;
      }
    this.resetstoptime();
    this.currentstop=null;
  }
  addaLine()
  {
    
    let tempinput=transit_realtime.TripUpdate.StopTimeUpdate.create({
      stop_sequence:null,
      stop_id:null,
      arrival:transit_realtime.TripUpdate.StopTimeEvent.create(),
      departure:transit_realtime.TripUpdate.StopTimeEvent.create()
    });
    this.startdatetime=new FormControl(null);
    this.enddatetime=new FormControl(null);
    this.current.stop_time_update.push(tempinput);
    this.currentstop=tempinput;
    
  }

  addroute(routeid){
    this.current.trip.route_id=routeid;
  }

  changestopid(stop){
    this.currentstop.stop_id=stop;
  }

  adddate(event: MatDatepickerInputEvent<Date>){
    const date:string =
      event.value.getFullYear() +
      ("00" + (event.value.getMonth()+1)).slice(-2) +
      ("00" + event.value.getDate()).slice(-2);
    this.current.trip.start_date=date;
  }
  @ViewChild("routerpicker", { static: false }) routerpicker: RouterPickerComponent;
  addinfo(info){
    this.current.trip.trip_id=info[0];
    this.current.trip.route_id=info[1];
    this.routerpicker.routerid=info[1];
    this.current.trip.direction_id=parseInt(info[2]);
    this.current.stop_time_update=[];
    let stoptimes=this.timetable.getstoptimes();
    let stop_id_index=stoptimes[0].indexOf("stop_id");
    let trip_id_index=stoptimes[0].indexOf("trip_id");
    let stop_sequence_index=stoptimes[0].indexOf("stop_sequence");
    
    for (var i=1;i<stoptimes.length;i++)
    {
      if (info[0]==stoptimes[i][trip_id_index])
      {
        let tempinput=transit_realtime.TripUpdate.StopTimeUpdate.create({
          stop_sequence:parseInt(stoptimes[i][stop_sequence_index]),
          stop_id:stoptimes[i][stop_id_index],
          arrival:transit_realtime.TripUpdate.StopTimeEvent.create({
            delay:0
          }),
          departure:transit_realtime.TripUpdate.StopTimeEvent.create({
            delay:0
          }),
          schedule_relationship:0
        });
        this.current.stop_time_update.push(tempinput);
      }
    }
    this.resetstoptime();
  }
}
