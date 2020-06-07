import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  constructor(
    private file: TimetableservService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  ngOnInit(): void {
    this.onReset();
  }
 
  
  
  onSave(){
  
    this.file.setroute(this.dataSource);
    window.alert('Your File agency.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=["route_id","route_type","route_short_name","route_long_name"];
    this.dataSource=this.file.getroute();
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    for (let i=0;i<name.length;i++){
      if (this.names.includes(name[i]))
      {
        tempname.push(name[i]);
      }
    }
    this.nameget.setValue(tempname);
    this.changeontable();
    this.addmode=false;
    this.value_rou="";
   
  }

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
  
  
  names:string[]=["route_long_name","route_short_name","route_desc","route_url","route_color","route_text_color","route_sort_order","continuous_pickup","continuous_drop_off"];
  defaultnames:string[]=["route_id","route_type"];

  nameget = new FormControl();
  value_rou="";
  addmode=false;
  
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.dataSource[0].slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.dataSource[0].includes(value[i])==false)
      {
        this.dataSource[0].push(value[i]);
        
        add=true;
        
      }
      else{
        let tempin=tempnames.indexOf(value[i]);
        tempnames.splice(tempin,1);
      }
    } 
    if (add==false){
     
      for (var i=0;i<this.defaultnames.length;i++)
      {
        tempnames.splice(tempnames.indexOf(this.defaultnames[i]),1);
      }
      let tempindex=this.dataSource[0].indexOf(tempnames[0]);
      this.dataSource[0].splice(tempindex,1);
      for (var j=1;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
    this.changeontable();
  }

  add_route_input(input:string){
    this.value_rou=input;
  }

  edit(){
    this.addmode=true;

  }
  
}
 
