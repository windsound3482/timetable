import { Component, OnInit,ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav'
@Component({
  selector: 'app-slide-navi',
  templateUrl: './slide-navi.component.html',
  styleUrls: ['./slide-navi.component.css']
})

export class SlideNaviComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  ngOnInit(): void {
  }
  
}
