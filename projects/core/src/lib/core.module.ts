import { NgModule } from '@angular/core';
import { CoreComponent, TableCtrl, TableMeta } from './core.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CoreComponent, TableCtrl],
  imports: [CommonModule],
  exports: [CoreComponent, TableCtrl]
})
export class CoreModule { }
