import { Component, OnInit ,ViewChild} from '@angular/core';
import { StopservService } from '../stopserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(
    private stop: StopservService,
  ) {  }
  dataSource :string[][];
  database :string[][]; 
  displayedColumns:string[];
  
  
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource=this.stop.gettransfer();
    this.displayedColumns=this.dataSource[0];
    this.database=this.dataSource.slice(1);
    let exindex=this.displayedColumns.indexOf("min_transfer_time");
    if (exindex==-1)
    {
      this.displayedColumns.push("min_transfer_time");
      for (var i=0;i<this.database.length;i++)
      {
        this.database[i].push("");
      }
    }
    exindex=this.displayedColumns.indexOf("transfer_type");
    for (var i=0;i<this.database.length;i++)
    {
      if (this.database[i][exindex]==(""))
          this.database[i][exindex]="0";
    }
    
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  } 

  onSave(){
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.dataSource=this.dataSource.concat(this.dataTable.data);
    this.stop.settransfer(this.dataSource);
  }

  deleteline(j:string[]){
    this.database=this.dataTable.data;
    this.database.splice(this.database.indexOf(j),1);
    
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }

  addaLine(){
    this.database=this.dataTable.data;
    this.database.push(["","","0",""]);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  setstop(input,j,i)
  {
    this.database[j][i]=input;
  }
  pattern_error=false;
  require_error=false;
}

