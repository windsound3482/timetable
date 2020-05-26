import { Component, OnInit } from '@angular/core';
import { ZipService } from '../zip.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private zip:ZipService,) { }

  ngOnInit(): void {
  }
  download(){
    this.zip.downloadFile();
  }
}
