/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LloginComponent } from './llogin.component';

describe('LloginComponent', () => {
  let component: LloginComponent;
  let fixture: ComponentFixture<LloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
