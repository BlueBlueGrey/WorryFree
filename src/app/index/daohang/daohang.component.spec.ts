/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DaohangComponent } from './daohang.component';

describe('DaohangComponent', () => {
  let component: DaohangComponent;
  let fixture: ComponentFixture<DaohangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
