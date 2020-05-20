import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { SlideNaviComponent } from './slide-navi/slide-navi.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SlideNaviComponent,
    FileuploaderComponent,
    DragDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: MapComponent },
      { path: 'DragDrop',component:FileuploaderComponent}
    ]),
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
