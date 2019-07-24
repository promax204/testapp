import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
// import { TableCtrl } from './datatable';
// import { TableCtrl } from 'adap-tools/core';

// import { MyLibModule } from 'adap-tools/my-lib';
import { CoreModule } from 'adap-tools/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    CoreModule, BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
  ]
})
export class AppModule { }
