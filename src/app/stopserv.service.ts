import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StopservService {
  style='{"version": 8,"sources": {'+
          '"raster-tiles": {'+
          '"type": "raster",'+
          '"tiles": ['+
          '"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],'+
          '"tileSize": 256}},'+
        '"layers": [{'+
        '"id": "simple-tiles",'+
        '"type": "raster",'+
        '"source": "raster-tiles",'+
        '"minzoom": 0,'+
        '"maxzoom": 22}],'+
        '"customAttribution": "<a href=\'https://www.openstreetmap.org/\'>© OpenStreetMap contributors</a>"}';

  public getstyle(){
    return (JSON.parse(this.style));
  }

  stop:string[][];
  level:string[][];
  public setstop(stopfile:string[][])
  {
    this.stop=stopfile;
  }
  public setlevel(level:string[][])
  {
    this.level=level;
  }
  public getstop()
  {
   
    return this.stop;
  }
  public getlevel()
  {
    return this.level;
  }
  constructor() { 
    this.stop=[["stop_id","stop_name","stop_lat","stop_lon","zone_id","parent_station"]];
    this.level=[["level_id","level_index","level_name"]];
  }
}
