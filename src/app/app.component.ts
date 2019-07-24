import { Component, ElementRef, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
// import { TableMeta } from './datatable';
// import { TableMeta } from 'adap-tools/core';

import * as jsdata from './customer.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:any = 'root';
  // customer:TableMeta=new TableMeta;
  // Qcustomer:TableMeta=new TableMeta;
  constructor() {}
  ngOnInit(){
    // this.customer.exec().then(()=>{
    //   try {
    //     var jdata = jsdata.customers;
    //     console.log(jdata);
  
    //   } catch(e) {
  
    //   }

    //   let tmp=this.customer.instance;
    //   console.log('inner', this);
    //   //tmp.title='awwww';
    //   tmp.data=jdata;
    //   tmp.menu=[
    //     {name:'ID',tindex:'id',type:'text'},
    //     {name:'Name',tindex:'name',type:'text'}
    //   ]

    //   tmp.set();
    // });    
  }
  testapp(){
    console.log('waaaaaaaa');
    return this;
  }
}

