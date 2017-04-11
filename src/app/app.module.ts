import { DefineCustomFilterDialogComponent } from './menu/define-custom-filter-dialog.component';
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
    DefineCustomFilterDialogComponent
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
  entryComponents: [DefineCustomFilterDialogComponent]
})
export class AppModule { }
