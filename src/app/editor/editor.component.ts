import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ZipService } from '../zip.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(
    private file:TimetableservService,
    private zip: ZipService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  value="";
  editable=false;
  value_cal="";
  current:Number=null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  
  edittrip(){
    this.editable=true;
    this.current=this.database.length+1;
    for (var i=0;i<this.database.length;i++)
    {
        if (this.database[i][0]==this.value){
          //set install value for the other tables.
          //database does not have displaycol
          this.value_cal=this.database[i][2];
          this.current=i+1;
          break;
        }
    }
    if (this.current==(this.database.length+1))
    {
      let tempint=Array(this.dataSource[0].length).fill("");
      this.dataSource.push(tempint);
    }
  }

  ngOnInit(): void {
    
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

    this.editable=false;
    this.value="";
    this.value_cal="";
  }
  
  onSave(stepper:any){
    this.file.settrip(this.dataSource);
    window.alert('Your Files have already been saved!');
    this.onReset(stepper);
    this.zip.downloadFile();
  }

  onReset(stepper:any){
    stepper.reset();
    this.ngOnInit();
  }
  
  add_trip_input(name:string){
    this.value=name;
  }
  
  oncal_Notify(event){
    this.value_cal=event;
    this.dataSource[this.current.valueOf()][this.dataSource[0].indexOf("service_id")]=this.value_cal;
  }

  download(){
    this.zip.downloadFile();
  }
 
}
