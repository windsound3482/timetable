import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { StopservService } from '../stopserv.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  names:string[]=["stop_code","stop_desc","stop_url","location_type","stop_timezone","wheelchair_boarding","level_id","platform_code"];
  defaultnames:string[]=["stop_id","stop_name","stop_lat","stop_lon","zone_id","parent_station"];
  nameget = new FormControl();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private stops:StopservService, 
    public dialog: MatDialog,
  ) { }
  map: mapboxgl.Map;
  current:number;
  currentvalue:string[];
  edit(){
    let idindex=this.displayedColumns.indexOf("stop_id");
    let flag=true;
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==this.value)
      {
        this.current=i;
        flag=false;
        break;
      }
    }
    if (flag)
    {
      window.alert("The Stop you want to edit must be add at first!!!");
      return;
    }
    let lonindex=this.displayedColumns.indexOf("stop_lon");
    let latindex=this.displayedColumns.indexOf("stop_lat");
    if (lonindex>=0 && latindex>=0)
    {
      this.map.flyTo({
        center: [
          parseFloat(this.dataSource[1][lonindex]),
          parseFloat(this.dataSource[1][latindex])
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
    this.currentvalue=this.dataSource[this.current];
    this.editmode=true;
  }

  editparent(){

    let temp=this.dataSource[this.current][this.displayedColumns.indexOf("parent_station")];
    this.onSave();
    this.value=temp;
  }

  onSave(){
    this.stops.setstop(this.dataSource);
    
    this.onReset();
  }

  createElement(i:number,idindex:number,latindex:number,lonindex:number){
    var ell = document.createElement('div');
        ell.innerHTML = "<span class=\"material-icons\">place</span>";
        ell.id = this.dataSource[i][idindex];
        ell.addEventListener('click', () => 
          { 
            if (this.addmode || this.editmode) 
              return;
            this.value= ell.id;
          }); 
        new mapboxgl.Marker(ell)
        .setLngLat([parseFloat(this.dataSource[i][lonindex]), parseFloat(this.dataSource[i][latindex])])
        .addTo(this.map);
  }
  onDelete(){
    this.dataSource.splice(this.current,1);

    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;

    var el=document.getElementById(this.value);
        el.parentNode.removeChild( el );
    this.onSave();
  }
  onReset(){
   
    let tempdata=this.stops.getstop();
    if (tempdata!=this.dataSource)
    { 
      this.displayedColumns=[];
      this.dataSource=this.stops.getstop();
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
      this.dataTable=new MatTableDataSource<string[]>(this.database);
      this.dataTable.paginator = this.paginator;

     
      var tempmap=document.getElementById("map");
      tempmap.innerHTML=null;
      
      this.map=new mapboxgl.Map({
        container: 'map', // container id
        style: this.stops.getstyle()
        ,
        center: [10, 50], // starting position
        zoom: 5 // starting zoom
      });
      this.map.addControl(new mapboxgl.NavigationControl());
      let idindex=this.displayedColumns.indexOf("stop_id");
      let latindex=this.displayedColumns.indexOf("stop_lat");
      let lonindex=this.displayedColumns.indexOf("stop_lon");
      
      for (var i=1;i<this.dataSource.length;i++)
      {
        this.createElement(i,idindex,latindex,lonindex)
      }
      if (this.dataSource.length>1)
      {
        this.map.flyTo({
          center: [
            parseFloat(this.dataSource[1][lonindex]),
            parseFloat(this.dataSource[1][latindex])
          ],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    }
    this.value="";
    this.addmode=true;
    this.editmode=false;
    this.current=null;
    
  }
  value:string="";
  addmode=true;
  editmode=false;
  ngOnInit(): void {
    this.onReset();
    console.log(this.dataSource);
    this.map.on('click', (e) => {
      if (this.editmode)
      {
        var el=document.getElementById(this.value);
        el.parentNode.removeChild( el );
        var newel = document.createElement('div');
        newel.innerHTML = "<span class=\"material-icons\">place</span>";
        newel.id =this.value;
        newel.addEventListener('click', (event) => 
        { 
          if (this.addmode || this.editmode) 
               return;
          this.value=newel.id;
        }); 
        new mapboxgl.Marker(newel)
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.map);
        this.dataSource[this.current][this.displayedColumns.indexOf("stop_lat")]=e.lngLat.lat.toString();
        this.dataSource[this.current][this.displayedColumns.indexOf("stop_lon")]=e.lngLat.lng.toString();
        return;
        
      }
      if (!this.addmode) 
        {return;}
      const dialogRef = this.dialog.open(InsertDialog, {
        width: '250px',
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (!result)
        { window.alert("You need an ID to define the stop!!!");}
        else{
          var el = document.createElement('div');
          el.innerHTML = "<span class=\"material-icons\">place</span>";
          el.id = result;
          el.addEventListener('click', (event) => 
            { 
              if (this.addmode || this.editmode) 
                return;
              this.value=el.id;
            }
          ); 
          this.value = result;
          new mapboxgl.Marker(el)
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.map);
          let tempinput=new Array(this.displayedColumns.length).fill("");
          tempinput[this.displayedColumns.indexOf("stop_id")]=this.value;
          tempinput[this.displayedColumns.indexOf("stop_lat")]=e.lngLat.lat.toString();
          tempinput[this.displayedColumns.indexOf("stop_lon")]=e.lngLat.lng.toString();
          this.dataSource.push(tempinput);
          this.database=this.dataSource.slice(1);
          this.dataTable=new MatTableDataSource<string[]>(this.database);
          this.dataTable.paginator = this.paginator;
        }
      });
     
    }); 
  }
 
  name: string;
 

  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.displayedColumns.slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.displayedColumns.includes(value[i])==false)
      {
        this.displayedColumns.push(value[i]);
        this.dataSource.splice(0,1,this.displayedColumns);
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
      let tempindex=this.displayedColumns.indexOf(tempnames[0]);
      this.displayedColumns.splice(tempindex,1);
      this.dataSource.splice(0,1,this.displayedColumns);
      for (var j=0;j<this.database.length;j++)
          this.database[j].splice(tempindex,1);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'insert-dialog.html',
})
export class InsertDialog {

  constructor(
    ) {}
 id:string="";

}


