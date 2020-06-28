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

;

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { SlideNaviComponent } from './slide-navi/slide-navi.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { DragDropDirective } from './drag-drop.directive';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';


import { AgencytableComponent } from './agencytable/agencytable.component';
import { EditorComponent } from './editor/editor.component';
import { FeedinfoComponent } from './feedinfo/feedinfo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TbForCalenComponent } from './tb-for-calen/tb-for-calen.component';

import { ShapetableComponent } from './shapetable/shapetable.component';
import { AttributionsComponent } from './attributions/attributions.component';
import { TranslationComponent } from './translation/translation.component';

import { FareComponent } from './fare/fare.component';
import { FareruleComponent } from './farerule/farerule.component';
import { FaretoolbarComponent } from './faretoolbar/faretoolbar.component';
import { StopComponent } from './stop/stop.component';
import { InsertDialog } from './stop/stop.component';
import { FreqComponent } from './freq/freq.component';
import { RouteComponent } from './route/route.component';
import { ToolbarStopComponent } from './toolbar-stop/toolbar-stop.component';
import { TimeZoneSelectComponent } from './time-zone-select/time-zone-select.component';
import { LevelPickerComponent } from './level-picker/level-picker.component';
import { RouterPickerComponent } from './router-picker/router-picker.component';
import { StopPickerComponent } from './stop-picker/stop-picker.component';
import { TransferComponent } from './transfer/transfer.component';
import { PathwayTransferEditorComponent } from './pathway-transfer-editor/pathway-transfer-editor.component';
import { PathwayComponent } from './pathway/pathway.component';
import { StopTimesComponent } from './stop-times/stop-times.component';
import { RealtimeComponent } from './realtime/realtime.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SlideNaviComponent,
    FileuploaderComponent,
    DragDropDirective,
    TableComponent,
    HomeComponent,
    AgencytableComponent,
    EditorComponent,
    FeedinfoComponent,
    CalendarComponent,
    TbForCalenComponent,
    ShapetableComponent,
    AttributionsComponent,
    TranslationComponent,
  
    FareComponent,
    FareruleComponent,
    FaretoolbarComponent,
    StopComponent,
    InsertDialog,
    FreqComponent,
    RouteComponent,
    ToolbarStopComponent,
    TimeZoneSelectComponent,
    LevelPickerComponent,
    RouterPickerComponent,
    StopPickerComponent,
    TransferComponent,
    PathwayTransferEditorComponent,
    PathwayComponent,
    StopTimesComponent,
    RealtimeComponent,
  ],
 

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent  },
      { path: 'CSVEditor', component:MapComponent},
      { path: 'CalendarEditor', component:CalendarComponent},
      { path: 'RouteEditor', component:RouteComponent},
      { path: 'DragDrop',component:FileuploaderComponent},
      { path: 'FareEditor', component:FareComponent},
      { path: 'StopEditor', component:StopComponent},
      { path: 'TimetableEditor', component:EditorComponent},
      { path: 'Path_Tansfer_Editor', component:PathwayTransferEditorComponent},
      { path: 'RealTime', component:RealtimeComponent},
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
