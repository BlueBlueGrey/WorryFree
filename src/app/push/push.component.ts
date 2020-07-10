



import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
export class PushComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  constructor() { }

  ngOnInit() {
  }

}
