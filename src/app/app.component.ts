// import { Component } from '@angular/core';

import { Component,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorryFree';
  modalRef:BsModalRef;
  constructor(private modalService:BsModalService){}
  Register(template){
    this.modalRef = this.modalService.show(template);
  }
}
