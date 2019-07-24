import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-core',
  template: `
    <p>
      core works!
    </p>
  `,
  styles: []
})
export class CoreComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}

@Component({
  selector: '[dataTable]',
  template: `
  <div *ngIf="!menu">No menu <code>dataTable</code></div>
  <div *ngIf="menu">
    <div *ngIf="filter">
        <input type="text" style="border:1px solid #353535;background:none;padding:5px;color:#888;" placeholder="Filter">
    </div>
  <table style="margin-top:5px;width:100%">
  <tr style="background-color: #353535;box-sizing: border-box;font-weight: 700;font-size:120%;color:#FFF;">
      <td class="field-menu" *ngFor="let i of menu; index as ii">{{i.name}}</td>                    
  </tr>
  <!-- results -->
  <tr class="field-x" *ngFor="let a of data; index as aa;">
      <td class="field-y" *ngFor="let b of menu; index as bb;">                    
          <div [ngSwitch]="b.type">
              <div *ngSwitchCase="'text'">
                  <div *ngIf="b.action" (click)="b.action(a)" style="cursor:pointer !important;">{{a[b.tindex]}}</div>
                  <div *ngIf="!b.action" [ngStyle]="b.edit ? {'cursor':'crosshair'} : {}">{{a[b.tindex]}}</div>    
              </div>
              <div *ngSwitchCase="'checkbox'">
                  <input type="checkbox" [attr.value]="a.id" />
              </div>
          </div>
      </td>
  </tr>
  <tr>
      <td [attr.colspan]="menu.length" *ngIf="!data">No result</td>
  </tr>
  <tr style="background:none !important;">
      <td [attr.colspan]="menu.length" style="text-align:right;background:none !important;"></td>
  </tr>
</table>
</div>
`,
styles:[`
table {font-family: arial;font-size:11px;color:#9c9c94;}            
tr:nth-child(even) {
    background-color: #252525;
}            
td {padding:10px}
button {cursor:pointer;}
.field-menu {background: #353535;}
.field-x {opacity:.8;}
.field-x:hover { opacity:1; cursor:default;}            
.field-y:hover { background:#272b2b; }`]
})
export class TableCtrl implements OnInit {
  title:any = 'Table Controller';
  @Input() dataTable:any;
  menu:any;
  data:any;
  pcurrent:any;
  filter:boolean=true;
  constructor() {}
  ngOnInit(){    
    this.dataTable.init(this);
  }
  set() {
    console.log('settt  this thing', this);
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