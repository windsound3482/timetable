import { Component, OnInit,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

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
    this.onReset();
  }
 
  gettimezone(i,j,input:string){
    this.database=this.dataTable.data;
    this.database[j][i]=input;
    this.gettablefrombase();
  }
  
  ondelete(element){
    this.database=this.dataTable.data;
    this.database.splice(this.database.indexOf(element),1);
    this.gettablefrombase();
  }

  onSave(){
    //check Validity
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    let timezoneindex=this.displayedColumns.indexOf("agency_timezone");
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.database=this.dataTable.data;
    for (var i=0;i<this.database.length;i++)
    {
      if (!this.database[i][timezoneindex])
      {
        window.alert("Please enter an timezone");
        return;
      }
    }
    this.dataSource=this.dataSource.concat(this.database);
    console.log("saveit");
    this.file.setagencyList(this.dataSource);
    window.alert('Your File agency.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.getagencyList();
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
      if (this.names.includes(name[i]))
      {
        tempname.push(name[i]);
      }
    }
    this.nameget.setValue(tempname);
    this.database=this.dataSource.slice(1);
    this.gettablefrombase();
  }
  
  
  names:string[]=["agency_lang","agency_phone","agency_fare_url","agency_email"];
  defaultnames:string[]=["agency_id","agency_name","agency_url","agency_timezone"];
  addaLine(){
    this.database=this.dataTable.data;
    this.database.push([]);
    this.gettablefrombase();
  }

  nameget = new FormControl();
  
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.displayedColumns.slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.displayedColumns.includes(value[i])==false)
      {
        this.displayedColumns.push(value[i]);
        for (var i=0;i<this.database.length;i++)
          this.database[i].push("");
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
      let tempindex=this.displayedColumns.indexOf(tempnames[0]);
      this.displayedColumns.splice(tempindex,1);
      for (var j=0;j<this.database.length;j++)
          this.database[j].splice(tempindex,1);
    }
    this.gettablefrombase();
  }

  gettablefrombase(){
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
  
}
 


