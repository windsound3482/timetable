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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideNaviComponent } from './slide-navi/slide-navi.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { DragDropDirective } from './drag-drop.directive';
import { HomeComponent } from './home/home.component';


import { AgencytableComponent } from './agencytable/agencytable.component';
import { EditorComponent } from './editor/editor.component';
import { FeedinfoComponent } from './feedinfo/feedinfo.component';
import { CalendarComponent } from './calendar/calendar.component';

import { FareComponent } from './fare/fare.component';
import { FareruleComponent } from './farerule/farerule.component';
import { StopComponent } from './stop/stop.component';
import { InsertDialog } from './stop/stop.component';
import { FreqComponent } from './freq/freq.component';
import { RouteComponent } from './route/route.component';

import { TimeZoneSelectComponent } from './time-zone-select/time-zone-select.component';
import { LevelPickerComponent } from './level-picker/level-picker.component';
import { RouterPickerComponent } from './router-picker/router-picker.component';
import { StopPickerComponent } from './stop-picker/stop-picker.component';
import { TransferComponent } from './transfer/transfer.component';
import { PathwayComponent } from './pathway/pathway.component';
import { StopTimesComponent } from './stop-times/stop-times.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { RealtimeTripComponent } from './realtime-trip/realtime-trip.component';
import { DeactivateGuard } from './deactivate-guard';




@NgModule({
  declarations: [
    AppComponent,
 
    SlideNaviComponent,
    FileuploaderComponent,
    DragDropDirective,
    HomeComponent,
    AgencytableComponent,
    EditorComponent,
    FeedinfoComponent,
    CalendarComponent,

    
    FareComponent,
    FareruleComponent,
    StopComponent,
    InsertDialog,
    FreqComponent,
    RouteComponent,
    TimeZoneSelectComponent,
    LevelPickerComponent,
    RouterPickerComponent,
    StopPickerComponent,
    TransferComponent,
    PathwayComponent,
    StopTimesComponent,
    RealtimeComponent,
    RealtimeTripComponent,
  ],
 

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent,canDeactivate: [DeactivateGuard]},
      { path: 'DragDrop',component:FileuploaderComponent},
      { path: 'AgencyEditor', component:AgencytableComponent,canDeactivate: [DeactivateGuard]},
      { path: 'FeedinfoEditor', component:FeedinfoComponent,canDeactivate: [DeactivateGuard]},
      { path: 'FareEditor', component:FareComponent},
      { path: 'StopEditor', component:StopComponent,canDeactivate: [DeactivateGuard]},
      { path: 'TimetableEditor', component:EditorComponent,canDeactivate: [DeactivateGuard]},
      { path: 'PathEditor', component: PathwayComponent,canDeactivate: [DeactivateGuard]},
      { path: 'TansferEditor', component:TransferComponent,canDeactivate: [DeactivateGuard]},
      { path: 'RealTime', component:RealtimeComponent,canDeactivate: [DeactivateGuard]},
    ]),
    
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
   
    
  ],
  providers: [DeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
