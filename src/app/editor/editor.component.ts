import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(
    private file:TimetableservService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  value="";
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  ngOnInit(): void {
    this.onReset();
  }
  
  onSave(){
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.database=this.dataTable.data;
    
    this.dataSource=this.dataSource.concat(this.database);
    
    this.file.settrip(this.dataSource);
    window.alert('Your File agency.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=["trip_id","route_id","service_id"];
    this.dataSource=this.file.gettrip();
    
   
    let trip_index=this.dataSource[0].indexOf("trip_id");
    let route_index=this.dataSource[0].indexOf("route_id");
    let service_index=this.dataSource[0].indexOf("service_id");
    this.database=[];
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      tempinput.push(this.dataSource[i][trip_index]);
      tempinput.push(this.dataSource[i][route_index]);
      tempinput.push(this.dataSource[i][service_index]);
      
      this.database.push(tempinput);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
  add_trip_input(name:string){
    this.value=name;
  }
  
 
}
