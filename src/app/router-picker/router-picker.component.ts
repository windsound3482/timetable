import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-router-picker',
  templateUrl: './router-picker.component.html',
  styleUrls: ['./router-picker.component.css']
})
export class RouterPickerComponent implements OnInit {
  @Input() routernow:string;
  @Output() notify= new EventEmitter();
  constructor(
    private file: TimetableservService,
  ) { }
  routerid="";
  ngOnInit(): void {
    this.displayedColumns=["route_id","route_type","route_short_name","route_long_name"];
    this.dataSource=this.file.getroute();
    this.changeontable();
    this.routerid=this.routernow;
  }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  changeontable()
  {
    this.database=[];
    let listname=this.dataSource[0];
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      for (var j=0;j<4;j++)
      {
        if (listname.includes(this.displayedColumns[j]))
          tempinput.push(this.dataSource[i][listname.indexOf(this.displayedColumns[j])]);
        else 
          tempinput.push("");
      }
      this.database.push(tempinput);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }

  setroute(input:string){
    this.routerid=input;
    this.notify.emit(input);
  }
}
