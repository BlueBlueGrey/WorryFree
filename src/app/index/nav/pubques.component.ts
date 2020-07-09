import { Component, OnInit } from '@angular/core';
import {Http } from '@angular/http';
@Component({
  templateUrl: './pubques.html',
})
export class PubQuesComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
  }

}
