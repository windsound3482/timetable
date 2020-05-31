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
import { MapComponent } from './map/map.component';
import { SlideNaviComponent } from './slide-navi/slide-navi.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { DragDropDirective } from './drag-drop.directive';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { AllfileService } from './allfile.service';
import { AgencytableComponent } from './agencytable/agencytable.component';
import { EditorComponent } from './editor/editor.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FeedinfoComponent } from './feedinfo/feedinfo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TbForCalenComponent } from './tb-for-calen/tb-for-calen.component';
import { AltercalenComponent } from './altercalen/altercalen.component';
import { ShapetableComponent } from './shapetable/shapetable.component';
import { AttributionsComponent } from './attributions/attributions.component';
import { TranslationComponent } from './translation/translation.component';
import {WarningDialog} from './tb-for-calen/tb-for-calen.component';


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
    ToolbarComponent,
    FeedinfoComponent,
    CalendarComponent,
    TbForCalenComponent,
    AltercalenComponent,
    ShapetableComponent,
    AttributionsComponent,
    TranslationComponent,
    WarningDialog
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent  },
      { path: 'CSVEditor', component:MapComponent},
      { path: 'CalendarEditor', component:CalendarComponent},
      { path: 'DragDrop',component:FileuploaderComponent},

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
  providers: [AllfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
