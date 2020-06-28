import { Component, OnInit,ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav'
import { ZipService } from '../zip.service';
import { RealtimeservService } from '../realtimeserv.service';

@Component({
  selector: 'app-slide-navi',
  templateUrl: './slide-navi.component.html',
  styleUrls: ['./slide-navi.component.css']
})

export class SlideNaviComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  constructor(
    private zip:ZipService,
    private realtime: RealtimeservService
  ) { }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  ngOnInit(): void {
  }

  download(){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    this.zip.downloadFile();
  }

  timedownload(){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    this.realtime.download();
  }
  
}
