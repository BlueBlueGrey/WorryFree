// import { Component } from '@angular/core';

import { Component,TemplateRef,NgModule } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http } from '@angular/http';

// 映射
@Component({
  selector: 'app-root',
  templateUrl: './index.html',
})
export class IndexComponent {
  title = 'WorryFree';
  modalRef:BsModalRef;
  constructor(private modalService:BsModalService,private http:Http){}
  Register(template){
    this.modalRef = this.modalService.show(template);
  }
  onRegisterSubmit(form:any){
      // 跨域 get
      console.log(form);
      // let url = 'api/register?email=11&pwd=22';
      // this.http.get(url).subscribe(function(data){
      //   console.log(data['_body']);
      // });
      //跨域 post
      let url = 'api/register'
      this.http.post(url,null,{params:form}).subscribe(function(data){
        console.log(data);
      });
  }
}
