import { Component, OnInit,ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav'
import { ZipService } from '../zip.service';
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
  ) { }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  ngOnInit(): void {
  }

  download(){
    this.zip.downloadFile();
  }
  
}
