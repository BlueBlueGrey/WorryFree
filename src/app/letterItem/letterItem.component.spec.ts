/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LetterItemComponent } from './letterItem.component';

describe('LetterItemComponent', () => {
  let component: LetterItemComponent;
  let fixture: ComponentFixture<LetterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
