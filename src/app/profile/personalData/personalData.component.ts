import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalData',
  templateUrl: './personalData.component.html',
  styleUrls: ['./personalData.component.css']
})
export class PersonalDataComponent implements OnInit {
  username="test";
  password="1234512345"
  constructor() { }

  ngOnInit() {
  }

}
