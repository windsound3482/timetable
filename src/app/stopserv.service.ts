import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StopservService {
  style='{"version": 8,"sources": {'+
          '"raster-tiles": {'+
          '"type": "raster",'+
          '"tiles": ['+
          '"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],'+
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
  constructor() { }
}
