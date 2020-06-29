import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Output,EventEmitter} from '@angular/core'


@Component({
  selector: 'app-realtime-trip',
  templateUrl: './realtime-trip.component.html',
  styleUrls: ['./realtime-trip.component.css']
})
export class RealtimeTripComponent implements OnInit {
  @Output() info= new EventEmitter();

  constructor(
    private file:TimetableservService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    
    this.displayedColumns=["trip_id","route_id","direction_id"];
    this.dataSource=this.file.gettrip();
    
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    

    let trip_index=this.dataSource[0].indexOf("trip_id");
    let route_index=this.dataSource[0].indexOf("route_id");
    let service_index=this.dataSource[0].indexOf("direction_id");
    this.database=[];
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      tempinput.push(this.dataSource[i][trip_index]);
      tempinput.push(this.dataSource[i][route_index]);
      if (service_index!=-1)
        tempinput.push(this.dataSource[i][service_index]);
      this.database.push(tempinput);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;

  }

  add_trip_input(trip){
    this.info.emit(trip);
  }

}
