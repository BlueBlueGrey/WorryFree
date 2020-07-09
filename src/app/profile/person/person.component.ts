import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  constructor() { }

  ngOnInit() {
  }

}
