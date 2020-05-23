import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { SlideNaviComponent } from './slide-navi/slide-navi.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { DragDropDirective } from './drag-drop.directive';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { AllfileService } from './allfile.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SlideNaviComponent,
    FileuploaderComponent,
    DragDropDirective,
    TableComponent,
    HomeComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent  },
      { path: 'Editor', component:MapComponent},
      { path: 'DragDrop',component:FileuploaderComponent}
    ]),
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    
  ],
  providers: [AllfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
