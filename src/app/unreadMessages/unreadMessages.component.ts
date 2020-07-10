import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
@Component({
  selector: 'app-unreadMessages',
  templateUrl: './unreadMessages.component.html',
  styleUrls: ['./unreadMessages.component.css']
})
export class UnreadMessagesComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  constructor() { }

  ngOnInit() {
  }

}
