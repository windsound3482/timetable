import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { StopservService } from '../stopserv.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  constructor(
    private stopss:StopservService, 
  ) { }
  map: mapboxgl.Map;
  markers:mapboxgl.Marker[]=[];
  ngOnInit(): void {
  
    this.map=new mapboxgl.Map({
      container: 'map', // container id
      style: this.stopss.getstyle()
      ,
      center: [10, 50], // starting position
      zoom: 5 // starting zoom
    });
   

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      document.getElementById('info').innerHTML =
      // e.point is the x, y coordinates of the mousemove event relative
      // to the top-left corner of the map
      JSON.stringify(e.point) +
      '<br />' +
      // e.lngLat is the longitude, latitude geographical position of the event
      JSON.stringify(e.lngLat.wrap());
      var marker=new mapboxgl.Marker()
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(this.map);
      this.markers.push(marker);
    });
    
    

  }

}
