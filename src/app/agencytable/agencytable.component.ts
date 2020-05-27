import { Component, OnInit,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-agencytable',
  templateUrl: './agencytable.component.html',
  styleUrls: ['./agencytable.component.css']
})
export class AgencytableComponent implements OnInit {

  constructor(
    private file:AllfileService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource=[];
    this.dataSource=this.file.getagencyList();
    let name:Array<string>= (this.dataSource)[0];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }
    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
 

  
  onSave(){
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.database=this.dataTable.data;
    this.dataSource=this.dataSource.concat(this.database);
    
    this.file.setagencyList(this.dataSource);
    window.alert('Your File agency.txt has already been saved!');
  }
  

  addaLine(){
    this.database=this.dataTable.data;
    this.database.push([]);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
}
 


