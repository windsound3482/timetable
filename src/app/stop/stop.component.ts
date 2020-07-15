import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { StopservService } from '../stopserv.service';
import { LevelPickerComponent } from '../level-picker/level-picker.component';
import { TimeZoneSelectComponent } from '../time-zone-select/time-zone-select.component';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css'],
  providers:[]
})
export class StopComponent implements OnInit {
  displayedColumns: string[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  names:string[]=["location_type","parent_station","stop_code","stop_desc","stop_url","stop_timezone","wheelchair_boarding","level_id","platform_code"];
  defaultnames:string[]=["stop_id","stop_name","stop_lat","stop_lon","zone_id"];
  nameget = new FormControl();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  @ViewChild(LevelPickerComponent) levelcom:LevelPickerComponent;
  @ViewChild(TimeZoneSelectComponent) tzcom:TimeZoneSelectComponent;
  constructor(
    public stops:StopservService, 
    public dialog: MatDialog,
  ) { }
  map: mapboxgl.Map;
  current:number;
  currentvalue:string[];
  edit(){
    this.editmode=true;
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
      this.current=this.dataSource.length;
      this.addnewelemnt();
    }
    let lonindex=this.dataSource[0].indexOf("stop_lon");
    let latindex=this.dataSource[0].indexOf("stop_lat");
    if (this.dataSource[this.current][lonindex])
    {
      this.map.jumpTo({
        center: [
          parseFloat(this.dataSource[this.current][lonindex]),
          parseFloat(this.dataSource[this.current][latindex])
        ]
      });
    }
    
    this.currentvalue=this.dataSource[this.current];
    this.addtype=this.currentvalue[this.dataSource[0].indexOf("location_type")];
    
  }

  editparent(){
    let idindex=this.dataSource[0].indexOf("stop_id");
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==this.currentparent)
      {
        this.currentparent=this.dataSource[i][this.dataSource[0].indexOf("parent_station")];
        let temptype=this.dataSource[i][this.dataSource[0].indexOf("location_type")];
        if (!this.currentparent)
        {
          this.currenttype=["0","1"];
          this.addtype=temptype;
        }
        else
        {
          this.currenttype=["0","2","3"];
          this.addtype=temptype;
        }
        this.value=this.currentparent;
        this.getstation(this.currentparent);
        let latindex=this.dataSource[0].indexOf("stop_lat");
        let lonindex=this.dataSource[0].indexOf("stop_lon");
        if (!this.currentparent)
          this.map.setZoom(10);
        else
          this.map.setZoom(16);
        this.map.jumpTo({
          center: [
            parseFloat(this.dataSource[i][lonindex]),
            parseFloat(this.dataSource[i][latindex])
          ]
        });
        
        this.addmode=true;
        this.editmode=false;
        this.current=null;
        break;
      }
    }
  }

  editchild(){
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
      window.alert("not possible to edit a new added element");
    }
    else
    {
      let temptype=this.dataSource[this.current][this.dataSource[0].indexOf("location_type")];
      if (temptype=="0" || temptype=="1")
      {
        this.currentparent=this.value;
        
        this.getstation(this.currentparent);
        if (temptype=="0")
        {
          this.currenttype=["4"];
          this.addtype="4";
        }
        if (temptype=="1")
        {
          this.currenttype=["0","2","3"];
          this.addtype="0";
        }
        let latindex=this.dataSource[0].indexOf("stop_lat");
        let lonindex=this.dataSource[0].indexOf("stop_lon");
        console.log(this.dataSource[this.current][lonindex]);
        this.map.setZoom(16);
        if (this.dataSource[this.current][lonindex])
          this.map.jumpTo({
            center: [
              parseFloat(this.dataSource[this.current][lonindex]),
              parseFloat(this.dataSource[this.current][latindex])
            ]
          });
        
        this.value="";
        this.addmode=true;
        this.editmode=false;
        this.current=null;
      }
    }
  }

  onSave(){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    this.stops.setstop(this.dataSource);
    this.onReset();
  }

  createElement(id,lat,lon,type){
    var ell = document.createElement('div');
    if (type=='0' || !type)
      ell.innerHTML = " <span class=\"material-icons\" style=\"color:blue\">place</span>";
    if (type=='1')
      ell.innerHTML = " <span class=\"material-icons\" style=\"color:darkblue\">place</span>";
    if (type=='2')
      ell.innerHTML = " <span class=\"material-icons\" style=\"color:red\">place</span>";
    if (type=='3')
      ell.innerHTML = "<span class=\"material-icons\" style=\"color:brown\">place</span>";
    if (type=='4')
      ell.innerHTML = "<span class=\"material-icons\" style=\"color:gray\">place</span>";
    
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

  additemtotable(index,i){
    let tempinput=new Array(5).fill("");
    for (var j=0;j<5;j++)
        if (index[j]>-1){
            tempinput[j]=this.dataSource[i][index[j]];
         }
    this.database.push(tempinput);
   
  }
  getstation(parentstation){
    var tempmap=document.getElementById("map");
      tempmap.innerHTML=null;
      this.map=new mapboxgl.Map({
        container: 'map', // container id
        style: this.stops.getstyle()
        ,
        center: [8.646927, 49.878708], // starting position
        zoom: 10 // starting zoom
      });
      this.map.addControl(new mapboxgl.NavigationControl());
     
    let latindex=this.dataSource[0].indexOf("stop_lat");
    let lonindex=this.dataSource[0].indexOf("stop_lon");
    let idindex=this.dataSource[0].indexOf("stop_id");
    let index=[];
    for (var i=0;i<5;i++)
    {
      index.push(this.dataSource[0].indexOf(this.displayedColumns[i]));
    }
    this.database=[];
    let parentindex=this.dataSource[0].indexOf("parent_station");
    let typeindex=this.dataSource[0].indexOf("location_type");
    if (parentstation)
    {
      let pop:string=""; //parent of parent
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][idindex]==parentstation)
        {
          pop=this.dataSource[i][parentindex];
          if (pop){
            for (var j=1;j<this.dataSource.length;j++)
            {
              if (this.dataSource[j][idindex]==pop)
              {
                this.additemtotable(index,j);
    
                if (this.dataSource[j][latindex] && this.dataSource[j][lonindex])
                  this.createElement(this.database[this.database.length-1][0],this.dataSource[j][latindex].valueOf(),this.dataSource[j][lonindex].valueOf(),this.dataSource[j][typeindex]);
                break;
              }
            }
          }
          this.additemtotable(index,i);

          if (this.dataSource[i][latindex] && this.dataSource[i][lonindex])
            this.createElement(this.database[this.database.length-1][0],this.dataSource[i][latindex].valueOf(),this.dataSource[i][lonindex].valueOf(),this.dataSource[i][typeindex]);
          break;  
        }
      } 
    }
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][parentindex]==parentstation)
        {
          this.additemtotable(index,i);
          if (this.dataSource[i][latindex] && this.dataSource[i][lonindex])
           this.createElement(this.database[this.database.length-1][0],this.dataSource[i][latindex].valueOf(),this.dataSource[i][lonindex].valueOf(),this.dataSource[i][typeindex]);
        }
      }

   
      this.dataTable=new MatTableDataSource<string[]>(this.database);
      this.dataTable.paginator = this.paginator;

     
      this.map.on('click', (e) => {
      
        if (this.editmode)
        {
          var el=document.getElementById(this.value);
          if (el)
            el.parentNode.removeChild( el );
          this.createElement(this.value, e.lngLat.lat,e.lngLat.lng,this.addtype);
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
            let idindex=this.dataSource[0].indexOf("stop_id");
            for (var i=1;i<this.dataSource.length;i++)
            {
              if (this.dataSource[i][idindex]==result)
              {
                window.alert("You need an another ID to define the stop,because the id you type in is already a stop");
                return;
              }
            }
            this.createElement(result, e.lngLat.lat,e.lngLat.lng,this.addtype);
            this.value=result;
            this.addnewelemnt();
            this.dataSource[this.dataSource.length-1][this.dataSource[0].indexOf("stop_lat")]=e.lngLat.lat.toString();
            this.dataSource[this.dataSource.length-1][this.dataSource[0].indexOf("stop_lon")]=e.lngLat.lng.toString();
            this.edit();
          }
        });
       
      }); 
  }


  onReset(){
    if (this.dataSource!=this.stops.getstop())
    {
      this.displayedColumns=["stop_id","stop_name","location_type","parent_station","platform_code"];
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

      if (!tempname.includes("platform_code"))
      {
        tempname.push("platform_code");
        this.changecol();
      }

      if (!tempname.includes("location_type"))
      {
        tempname.push("location_type");
        this.changecol();
      }
      else
      {
        let index=this.dataSource[0].indexOf("location_type");
        for (var i=1;i<this.dataSource.length;i++)
          if (this.dataSource[i][index]=="")
          {
            this.dataSource[i][index]="0";
          }
      }

      if (tempname.includes("wheelchair_boarding"))
      {
        let index=this.dataSource[0].indexOf("wheelchair_boarding");
        for (var i=1;i<this.dataSource.length;i++)
          if (this.dataSource[i][index]=="")
          {
            this.dataSource[i][index]="0";
          }
      }
      //change to new format
      

      this.getstation("");
      let latindex=this.dataSource[0].indexOf("stop_lat");
      let lonindex=this.dataSource[0].indexOf("stop_lon");
      for (var i=1;i<this.dataSource.length;i++) 
      {
        if (this.dataSource[i][lonindex])
        {
          this.map.jumpTo({
            center: [
              parseFloat(this.dataSource[i][lonindex]),
              parseFloat(this.dataSource[i][latindex])
            ]
          });
          break;
        }
      }
      this.currenttype=["0","1"];
      this.addtype="0";
      this.currentparent="";
    
    }
    this.value="";
    this.addmode=true;
    this.editmode=false;
    this.current=null;
    
  }
  value:string="";
  addmode=true;
  editmode=false;
  addtype="0";
  currentparent="";
  ngOnInit(): void {
    this.onReset();
    
  }
  

  addnewelemnt(){
    let tempinput=new Array(this.dataSource[0].length).fill("");
    tempinput[this.dataSource[0].indexOf("stop_id")]=this.value;
    tempinput[this.dataSource[0].indexOf("location_type")]=this.addtype;
    tempinput[this.dataSource[0].indexOf("parent_station")]=this.currentparent;
    this.dataSource.push(tempinput);
    this.database.push([this.value,"",this.addtype,this.currentparent,""]);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  name: string;
 
  currenttype:string[]=[];
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.dataSource[0].slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.dataSource[0].includes(value[i])==false)
      {
        this.dataSource[0].push(value[i]);
        if (value[i]=="location_type" || value[i]=="wheelchair_boarding")
          for (var j=1;j<this.dataSource.length;j++)
            this.dataSource[j].push("0");
        else
          for (var j=1;j<this.dataSource.length;j++)
            this.dataSource[j].push("");
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
      console.log(tempnames[0]);
      let tempindex=this.dataSource[0].indexOf(tempnames[0]);
      for (var j=0;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
  }

  add_stop_input(input:string){
    this.value=input;
  }

  changetimezone(timezone){
  
    this.currentvalue[this.dataSource[0].indexOf("stop_timezone")]=timezone;
  }
  changelevel(level){
    this.currentvalue[this.dataSource[0].indexOf("level_id")]=level;
  }

  canDeactivate() {
    if (this.editmode)
    {
      window.alert("Please Save before you leave this page!");
      return false;
    }
    return true;
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


