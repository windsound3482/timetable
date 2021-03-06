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
  
  value_trp="XXXXXXXXXXXXXXXXXXXXX";
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource=this.time.getfreq();
    this.displayedColumns=this.dataSource[0];
    this.database=this.dataSource.slice(1);
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
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.dataSource=this.dataSource.concat(this.dataTable.data);
    this.time.setfreq(this.dataSource);
    this.value_trp="XXXXXXXXXXXXXXXXXXXXX";
  }

  onDelete(){
    let tripidindex=this.displayedColumns.indexOf("trip_id");
    for (var i=this.database.length-1;i>=0;i--)
    {
      if (this.database[i][tripidindex]==this.value_trp)
      {
        this.database.splice(i,1);
      }
    }
    this.onSave();
  }

  //set filter value from editor
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

  addaLine(){
    let tempadd=Array(this.displayedColumns.length).fill("");
    let idindex=this.displayedColumns.indexOf("trip_id");
    let exindex=this.displayedColumns.indexOf("exact_times");
    tempadd[idindex]=this.value_trp;
    tempadd[exindex]="0";
    this.database=this.dataTable.data;
    this.database.push(tempadd);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.dataTable.filter=this.value_trp; 
  }

  pattern_error=false;
  require_error=false;
}
