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
  transfer:string[][];
  pathway:string[][];

  public setstop(stopfile:string[][])
  {
    this.stop=stopfile;
  }
  public setlevel(level:string[][])
  {
    this.level=level;
  }
  public settransfer(transfer:string[][])
  {
    this.transfer=transfer;
  }
  public setpathway(pathway:string[][])
  {
    this.pathway=pathway;
  }
  public getstop()
  {
   
    return this.stop;
  }
  public getlevel()
  {
    return this.level;
  }
  public gettransfer()
  {
    return this.transfer;
  }
  public getpathway()
  {
    return this.pathway;
  }
  constructor() { 
    this.stop=[["stop_id","stop_name","stop_lat","stop_lon","zone_id","parent_station"]];
    this.level=[["level_id","level_index","level_name"]];
    this.transfer=[["from_stop_id","to_stop_id","transfer_type","min_transfer_time"]];
    this.pathway=[["pathway_id","from_stop_id","to_stop_id","pathway_mode","is_bidirectional","length","stair_count"]];
  }
}
