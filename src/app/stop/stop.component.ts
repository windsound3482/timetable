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
  names:string[]=["location_type","parent_station","stop_code","stop_desc","stop_url","stop_timezone","wheelchair_boarding","level_id","platform_code"];
  defaultnames:string[]=["stop_id","stop_name","stop_lat","stop_lon","zone_id"];
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
    let idindex=this.dataSource[0].indexOf("stop_id");
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

  createElement(id,lat,lon){
    var ell = document.createElement('div');
        ell.innerHTML = "<span class=\"material-icons\">place</span>";
        ell.id = id;
        ell.addEventListener('click', () => 
          { 
            if (this.addmode || this.editmode) 
              return;
            this.value= ell.id;
          }); 
        new mapboxgl.Marker(ell)
        .setLngLat([lon, lat])
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

  getstation(type,parentstation){
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
     
      let latindex=this.dataSource[0].indexOf("stop_lat");
      let lonindex=this.dataSource[0].indexOf("stop_lon");
     
    let index=[];
    for (var i=0;i<4;i++)
    {
      index.push(this.dataSource[0].indexOf(this.displayedColumns[i]));
    }
    console.log(index);
    this.database=[];
    let typeindex=this.dataSource[0].indexOf("location_type");
    let parentindex=this.dataSource[0].indexOf("parent_station");
   
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (((type==1) && !this.dataSource[i][parentindex]) || ((type!=1) && (this.dataSource[i][parentindex]==parentstation)))
        {
          let tempinput=new Array(4).fill("");
          for (var j=0;j<4;j++)
            if (index[j]>-1){
                tempinput[j]=this.dataSource[i][index[j]];
            }
          this.database.push(tempinput);
          if (this.dataSource[i][latindex] && this.dataSource[i][lonindex])
           this.createElement(tempinput[0],this.dataSource[i][latindex].valueOf(),this.dataSource[i][lonindex].valueOf())
        }
      }
      this.dataTable=new MatTableDataSource<string[]>(this.database);
      this.dataTable.paginator = this.paginator;

      if ((type==1) && (this.dataSource.length>1)) 
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


  onReset(){
    let tempdata=this.stops.getstop();
    if (tempdata!=this.dataSource)
    { 
      this.displayedColumns=["stop_id","stop_name","location_type","parent_station"];
      this.dataSource=this.stops.getstop();
      let name:Array<string>= (this.dataSource)[0];
      let tempname:string[]=[];
      for (let i=0;i<name.length;i++){
        if (this.names.includes(name[i]))
        {
          tempname.push(name[i]);
        }
      }
      this.nameget.setValue(tempname);
      if (!tempname.includes("parent_station"))
      {
        tempname.push("parent_station");
        this.changecol();
      }
      if (!tempname.includes("location_type"))
      {
        tempname.push("location_type");
        this.changecol();
      }

      this.getstation(1,"");
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
    this.map.on('click', (e) => {
      if (this.editmode)
      {
        var el=document.getElementById(this.value);
        el.parentNode.removeChild( el );
        this.createElement(this.value, e.lngLat.lat,e.lngLat.lng);
        this.dataSource[this.current][this.dataSource[0].indexOf("stop_lat")]=e.lngLat.lat.toString();
        this.dataSource[this.current][this.dataSource[0].indexOf("stop_lon")]=e.lngLat.lng.toString();
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
          this.createElement(result, e.lngLat.lat,e.lngLat.lng);
          this.value=result;
          let tempinput=new Array(this.dataSource[0].length).fill("");
          tempinput[this.dataSource[0].indexOf("stop_id")]=this.value;
          tempinput[this.dataSource[0].indexOf("stop_lat")]=e.lngLat.lat.toString();
          tempinput[this.dataSource[0].indexOf("stop_lon")]=e.lngLat.lng.toString();
          this.dataSource.push(tempinput);
          this.database.push([this.value,"","",""]);
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
      for (var j=0;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
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


