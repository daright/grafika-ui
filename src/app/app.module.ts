import { DefineCustomFilterDialogComponent } from './menu/define-custom-filter/define-custom-filter-dialog.component';
import { AboutDialogComponent } from './menu/about/about-dialog.component';

import { BackendService } from './service/backend.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DefineCustomFilterDialogComponent,
    AboutDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    BackendService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DefineCustomFilterDialogComponent, AboutDialogComponent
  ]
})
export class AppModule { }
