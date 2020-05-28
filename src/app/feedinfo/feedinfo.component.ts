import { Component, OnInit ,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-feedinfo',
  templateUrl: './feedinfo.component.html',
  styleUrls: ['./feedinfo.component.css']
})
export class FeedinfoComponent implements OnInit {

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
    this.dataSource=this.file.getfeedinfo();
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
    
    this.file.setfeedinfo(this.dataSource);
    window.alert('Your File feed_info.txt has already been saved!');
  }
  

  addaLine(){
    this.database=this.dataTable.data;
    this.database.push([]);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
}
 