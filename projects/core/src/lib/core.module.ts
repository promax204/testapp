import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreComponent, TableCtrl } from './core.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { TableSelectCtrl } from './core.datable';

@NgModule({
  declarations: [CoreComponent, TableCtrl, TableSelectCtrl],
  imports: [CommonModule],
  exports: [CoreComponent, TableCtrl, TableSelectCtrl],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CoreModule { }
