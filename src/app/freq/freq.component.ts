import { Component, OnInit ,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-freq',
  templateUrl: './freq.component.html',
  styleUrls: ['./freq.component.css']
})
export class FreqComponent implements OnInit {

  constructor(
    private time: TimetableservService,
  ) {  }
  dataSource :string[][];
  database :string[][]; 
  displayedColumns:string[];
  idindex=0;
  value_trp="";
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource=this.time.getfreq();
    this.displayedColumns=this.dataSource[0];
    this.database=this.dataSource.slice(1);
    this.idindex=this.displayedColumns.indexOf("trip_id");
    let exindex=this.displayedColumns.indexOf("exact_times");
    if (exindex==-1)
    {
      this.displayedColumns.push("exact_times");
      for (var i=0;i<this.database.length;i++)
      {
        this.database[i].push("0");
      }
    }
    else
    {
      for (var i=0;i<this.database.length;i++)
      {
        if ((this.database[i][exindex]==("")) || (this.database[i][exindex]==null))
          this.database[i][exindex]="0";
      }
    }
    
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  } 

  onSave(){
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.dataSource=this.dataSource.concat(this.dataTable.data);
    this.time.setfreq(this.dataSource);
    this.value_trp="";
  }
  setfilter(value:string) {
    this.value_trp=value;
    this.dataTable.filter=value; 
  }
  deleteline(j:string[]){
    this.database=this.dataTable.data;
    this.database.splice(this.database.indexOf(j),1);
    
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.dataTable.filter=this.value_trp; 
  }
}
