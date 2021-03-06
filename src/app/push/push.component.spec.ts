/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PushComponent } from './push.component';

describe('PushComponent', () => {
  let component: PushComponent;
  let fixture: ComponentFixture<PushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
