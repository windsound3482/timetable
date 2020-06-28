import { Component, OnInit,ViewChild} from '@angular/core';
import { RealtimeservService } from '../realtimeserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {transit_realtime} from 'timetable';


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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.displayedColumns=["entity_id","trip_id","start_time","start_date"];
    this.feed=this.realtime.getfeed();
    this.database=[];
    
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        let tempinput=[];
        tempinput.push(entity.id);
        tempinput.push(entity.trip_update.trip.trip_id);
        tempinput.push(entity.trip_update.trip.start_time);
        tempinput.push(entity.trip_update.trip.start_date);
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
    this.feed.entity.forEach((entity) => {
      if (entity.trip_update) {
        
        if (entity.id == this.value)
          this.current=entity;
        return;
      }
    });
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
}
