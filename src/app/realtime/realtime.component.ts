import { Component, OnInit,ViewChild} from '@angular/core';
import { RealtimeservService } from '../realtimeserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {transit_realtime} from 'timetable';
import { RealtimeStopTimesComponent } from '../realtime-stop-times/realtime-stop-times.component';


@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})


export class RealtimeComponent implements OnInit {

  constructor(
    private realtime:RealtimeservService,
  ) { }
  value="";
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(RealtimeStopTimesComponent) stoptimescom:RealtimeStopTimesComponent ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }
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
    
    this.addmode=false;
  }
  current;
  edit(){
    this.addmode=true;
    let flag=true;
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        
        if (entity.id == this.value)
        {
          this.current=entity.trip_update;
          flag=false;
          return;
        }
      }
    });
    if (flag==true)
    {
      this.current=transit_realtime.TripUpdate.create();
      this.feed.entity.push(transit_realtime.FeedEntity.create({
        id:this.value,
        trip_update:this.current
      }));
      console.log("hello");
    }
    
  }
  
  editentity(addvalue){
    this.value=addvalue as string;
  }

  onSave(){
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

  addinfo(info){
    this.current.trip.trip_id=info[0];
    this.current.trip.route_id=info[1];
    this.current.trip.direction_id=info[2];
    this.stoptimescom.setfilter(info[0]);
  }
  currentstop;
  addstoptimeinfo(info){
    this.current.stop_time_update.forEach((stoptime) => {
      if ((stoptime.stop_sequence==info[1]) && (stoptime.stop_id==info[0]))
      {
        this.currentstop=stoptime;
        return;
      }
    });
    let tempinput=transit_realtime.TripUpdate.StopTimeUpdate.create({
      stop_sequence:info[1],
      stop_id:info[0]
    });
    this.current.stop_time_update.push(tempinput);
    this.currentstop=tempinput;
  }
}
