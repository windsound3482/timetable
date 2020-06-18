import { Component, OnInit,ViewChild} from '@angular/core';
import { StopservService } from '../stopserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Output,EventEmitter} from '@angular/core'

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent implements OnInit {

  constructor(
    private file: StopservService,
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
    this.file.setpathway(this.dataSource);
    window.alert('Your File pathways.txt has already been saved!');
  
    this.onReset();
  }

  onDelete()
  {
    this.dataSource.splice(this.current,1);
    this.file.setpathway(this.dataSource);
    this.onReset();
  }

  onReset(){
    this.displayedColumns=["pathway_id","from_stop_id","to_stop_id","pathway_mode","is_bidirectional"];
    this.dataSource=this.file.getpathway();
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
    this.current=null;
   
  }

  changeontable()
  {
    this.database=[];
    let listname=this.dataSource[0];
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      for (var j=0;j<5;j++)
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
  
  
  names:string[]=["length","traversal_time","stair_count","max_slope","min_width","signposted_as","reversed_signposted_as"];
  defaultnames:string[]=["pathway_id","from_stop_id","to_stop_id","pathway_mode","is_bidirectional"];

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
        break;
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

  current=null;
  edit(){
    this.addmode=true;
  
    let idindex=this.dataSource[0].indexOf("pathway_id");
    this.current=this.dataSource.length;
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==this.value_rou)
      {
        this.current=i;
        break;
      }
    }
    if (this.current==this.dataSource.length)
    {
      let tempinput:string[]=new Array(this.dataSource[0].length).fill("");
      let pathway_way_index=this.dataSource[0].indexOf("pathway_mode");
      let is_bidirectional_index=this.dataSource[0].indexOf("is_bidirectional");
      tempinput[idindex]=this.value_rou;
      tempinput[pathway_way_index]="1";
      tempinput[is_bidirectional_index]="0";
      this.dataSource.push(tempinput); 
      this.changeontable();
    }
  }

  changestop(i,stop){
    this.dataSource[this.current][i]=stop;
  }
  
}
 
