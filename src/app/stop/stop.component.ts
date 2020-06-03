import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { StopservService } from '../stopserv.service';
export interface DialogData {
  animal: string;
  name: string;
}
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
  markers:mapboxgl.Marker[]=[];
  
  onReset(){
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
  }
  value:string="";
  addmode:false;
  ngOnInit(): void {
    this.onReset();


    this.map=new mapboxgl.Map({
      container: 'map', // container id
      style: this.stops.getstyle()
      ,
      center: [10, 50], // starting position
      zoom: 5 // starting zoom
    });
   

    this.map.addControl(new mapboxgl.NavigationControl());

    
    this.map.on('click', (e) => {
      
      if (!this.addmode) {return;}
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (!result)
        { window.alert("You need an ID to define the stop!!!");}
        else{
          var el = document.createElement('div');
          el.innerHTML = "<span class=\"material-icons\">place</span>";
          el.id = result;
          el.addEventListener('click', () => 
            { 
              if (this.addmode) return;
             
              window.alert("Marker Clicked.");
              this.value=el.id;
              
            }
          ); 
          this.value = result;
          var marker=new mapboxgl.Marker(el,{offset:[-25, -25]})
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.map);
          this.markers.push(marker); 
        }
      });
     
      document.getElementById('info').innerHTML =
      // e.point is the x, y coordinates of the mousemove event relative
      // to the top-left corner of the map
      JSON.stringify(e.point) +
      '<br />' +
      // e.lngLat is the longitude, latitude geographical position of the event
      JSON.stringify(e.lngLat.wrap());
      
    }); 



  }
  animal: string;
  name: string;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.displayedColumns.slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.displayedColumns.includes(value[i])==false)
      {
        this.displayedColumns.push(value[i]);
        
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
      for (var j=0;j<this.database.length;j++)
          this.database[j].splice(tempindex,1);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    ) {}
 id:string="";

}


