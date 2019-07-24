import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectCtrl } from './core.datable';

describe('TableSelectCtrl', () => {
  let component: TableSelectCtrl;
  let fixture: ComponentFixture<TableSelectCtrl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSelectCtrl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSelectCtrl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
