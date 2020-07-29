/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PushItemComponent } from './pushItem.component';

describe('PushItemComponent', () => {
  let component: PushItemComponent;
  let fixture: ComponentFixture<PushItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
