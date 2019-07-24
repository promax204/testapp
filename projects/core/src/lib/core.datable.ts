import { Component, ElementRef, Input, OnInit, Compiler, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: '[tableSelect]',
  template: `<div class="btn-group" dropdown (onShown)="onShown()" (onHidden)="onHidden()" (isOpenChange)="isOpenChange()" [insideClick]="true">
  <button dropdownToggle type="text" [ngClass]="ngclass" [ngStyle]="ngstyle" [attr.disabled]="btntoggle" (click)="onClick(inputf)" value="{{value}}">{{value}}</button>  
  <ul id="dropdown-triggers-manual" *dropdownMenu class="dropdown-menu" role="menu" aria-labelledby="button-triggers-manual" style="width:400px;padding:10px;background:#383d41;z-index:99999;">
    <!-- filter results -->
    <input type="text" #inputf class="inputfilter form-control" (keyup)="onKey($event); eventkey($event)" (focus)="kdown=1" (blur)="kdown=0" [ngStyle]="(kdown) ? {'background':'#FFF'} : {'background':'none'} " [(ngModel)]="ifilter" placeholder="Search">
    <div style="min-height:100px;">
      <table style="margin-top:5px;width:100%;">
      <tr style="background-color: #353535;box-sizing: border-box;font-weight: 700;font-size:120%;color:#FFF;">
          <td class="field-menu" *ngFor="let i of menu">{{i.name}}</td>                    
      </tr>
      <tr class="field-x" *ngFor="let a of filterdata.pcurrent">
          <td class="field-y" *ngFor="let b of menu">                    
            <div *ngIf="b.action" (click)="value=a.name;setvalue(a);dropdown.hide()" style="cursor:pointer !important;">{{a[b.tindex]}}</div>
            <div *ngIf="!b.action" (click)="value=a.name;setvalue(a);dropdown.hide()" [ngStyle]="b.edit ? {'cursor':'crosshair'} : {}" style="cursor:pointer !important;">{{a[b.tindex]}}</div>   
          </td>
      </tr>
      <tr *ngIf="!filterdata.pcurrent.length">
        <td [attr.colspan]="menu.length">No result</td>
      </tr>
      <tr style="background:none !important;">
      <td [attr.colspan]="menu.length" style="text-align:right;background:none !important;">{{filterdata.current}} of {{ (!filterdata.pages.length) ? 1 : filterdata.pages.length  }} Pages <button class="btn btn-success btn-sm" [disabled]="filterdata.current==1" (click)="fprev()" style="margin-right:5px;">Previous</button> <button class="btn btn-success btn-sm" [disabled]="(filterdata.current >= filterdata.pages.length) ? true : false" (click)="fnext()">Next</button></td>
      </tr>
      </table>
    </div>
  </ul>
  </div>`,
  styles: [`
table {font-family: arial;font-size:80%;color:#9c9c94;}            
tr:nth-child(even) {
    background-color: #252525;
}            
th {padding:10px}
button {cursor:pointer;font-size:90%;}
.icons {opacity:.5;float:right;}
.inputfilter {padding:5px;border:1px solid #9999;margin-right:10px;width: calc(100% - 100px);}
.field-menu {background: #353535;}
.field-x {opacity:.8;}
.field-x:hover { opacity:1; cursor:default;}            
.field-y:hover { background:#272b2b; }
.open { position:relative; }
.open ul {
  display:initial !important;  
}
`]
})
export class TableSelectCtrl implements OnInit {
  title: any = 'Table Controller';
  @Input() tableSelect: any;
  menu: any={};
  kdown: any;
  data: any = [];
  pcurrent: any = [];
  filter: boolean = true;
  ifilter: any;
  pages: any = [];
  current: any = 1;
  entries: any;
  rowlimit: any;
  tempdata: any;
  dropdown: any;
  autoclose: any;
  btntoggle: boolean = false;
  @Input() xxinit: any;
  @Input() bootstrap: any;
  dropdownMenu: any;
  value:any;
  ngclass:any;
  ngstyle:any;
  inputf:any;

  filterdata: any = { data: [], pages: [], current: 1, pcurrent: [] }
  constructor(
    private compiler: Compiler, 
    private rev: ComponentFactoryResolver,
    public target: ViewContainerRef,
    private elementRef: ElementRef) { }

  onHidden() { }
  onShown() { }
  isOpenChange() {
    return false;
  }
  onClick(elem) { }
  openp(a, b) {
  }
  keyupi() { }
  init(a) { }
  ngOnInit() {
    if (!this.tableSelect) throw new Error('bad tableSelect!');
    this.tableSelect.init(this);
  }
  onKey(ev: any) { // search filter
    this.pcurrent = [];
    const temp: any = [];
    this.pages.forEach(element => {
      for (const p in element) {
        // if (Object.values(element[p]).join().toLocaleLowerCase().indexOf(this.ifilter.toLocaleLowerCase()) != -1) {
        if (JSON.stringify(element[p]).toLocaleLowerCase().indexOf(this.ifilter.toLocaleLowerCase()) != -1) {
          // this.pcurrent.push(element[p]);
          temp.push(element[p]);
        }
      }
    });

    this.filterdata = { data: temp, pages: temp.chunk(this.menu.get().rowlimit), current: 1, pcurrent: temp.chunk(this.menu.get().rowlimit)[0] || [] };

    if (!this.ifilter.length) this.default();
  }
  setvalue(){}
  eventkey() {}
  set() {
    this.pages = this.data.chunk(this.menu.get().rowlimit);
    this.pcurrent = this.pages[this.current - 1];
  }
  default() {
    this.pages = this.data.chunk(this.menu.get().rowlimit);
    this.pcurrent = this.pages[this.current - 1];
    this.filterdata = { data: [], pages: [], current: 1, pcurrent: [] }; // default filter
  }
  next() {
    if (this.pages.length == this.current) {
      return false;
    } else {
      this.current++;
    }
    this.pcurrent = this.pages[this.current - 1];
  }
  prev() {
    if (this.current == 1) { return false; } else {
      this.current--;
    }

    this.pcurrent = this.pages[this.current - 1];
  }
  sortBy(target: any) {

    if (target.clicked == undefined) {
      this.tempdata = JSON.parse(JSON.stringify(this.data));
    }

    let temp:any={};
    switch (target.clicked) {
      case 'asc':
        temp = this.data.sortAsc(target.tindex, this.data);
        for (const x in this.menu) { this.menu[x].clicked = undefined; }
        target.clicked = 'desc';
        break;
      case 'desc':
        temp = this.data.sortDesc(target.tindex, this.data);
        for (const x in this.menu) { this.menu[x].clicked = undefined; }
        target.clicked = 'default';
        break;
      case 'default':
        temp = this.tempdata;
        for (const x in this.menu) { this.menu[x].clicked = undefined; }
        target.clicked = 'asc';
        break;
      default:
        temp = this.data.sortAsc(target.tindex, this.data);
        for (const x in this.menu) { this.menu[x].clicked = undefined; }
        target.clicked = 'desc';
    }


    this.pages = temp.chunk(this.menu.get().rowlimit);
    this.pcurrent = this.pages[this.current - 1];
  }
  fnext() {
    if (this.filterdata.pages.length == this.filterdata.current) {
      return false;
    } else {
      this.filterdata.current++;
    }
    this.filterdata.pcurrent = this.filterdata.pages[this.filterdata.current - 1];
  }
  fprev() {
    if (this.filterdata.current == 1) { return false; } else {
      this.filterdata.current--;
    }

    this.filterdata.pcurrent = this.filterdata.pages[this.filterdata.current - 1];
  }
  toggle(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
  }
  custom(i, a) {

    const compMetadata = new Component({
      selector: 'app-custom',
      template: `test`,
      styles: ['']
    });

    const t = document.querySelector('.x_' + i);
    t.innerHTML = a[1].action;
  }

}


export class TableSelectMeta {
  instance: any;
  constructor() { }
  init(a) {
    this.instance = a;
  }
  set() {
    return this;
  }
  exec() {
    return new Promise((result, reject) => {
      setTimeout(() => result(), 0);
    })
  }
}


export class settings {
  rowlimit;
  height;
  width;
  hidepage;
  constructor(a:any){
    this.rowlimit = a.rowlimit ? a.rowlimit : 10;
    this.height = a.height ? a.height : '100%';
    this.width = a.width ? a.width : '100%';
    this.hidepage = a.hidepage ? a.hidepage : false;
    return this;
  }
}

export class TableMeta {
    instance:any;
    constructor() {}
    init(a){
      this.instance = a;
    }
    set(){
      return this;
    }
    exec(){
        return new Promise((result, reject)=>{
            setTimeout(()=>result(), 0);
        })
    }
}
Object.defineProperty(Array.prototype, 'current', {
  value: function (a) {
    return a;
  }
});
Object.defineProperty(Object.prototype, 'getdatalist', {
  value: function () {
    return this.datalist;
  }
});
Object.defineProperty(Array.prototype, 'get', {
  value: function (a) {
    return { rowlimit: this.value.rowlimit, height: this.value.height, width: this.value.width };
  }
});
Object.defineProperty(Array.prototype, 'Arrayset', {
  value: function (a) {
    try {
      this.value = new settings(a);
    } catch (e) { throw new Error(e); }
    return this;
  }
});

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    const array = this;
    return [].concat.apply([],
      array.map(function(elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
});

Object.defineProperty(Array.prototype, 'sortAsc', {
  value: function (target, data) {
    return data.sort((a, b) => (a[target] > b[target]) ? 1 : -1);
  }
});
Object.defineProperty(Array.prototype, 'sortDesc', {
  value: function (target, data) {
    return data.sort((a, b) => (a[target] < b[target]) ? 1 : -1);
  }
});