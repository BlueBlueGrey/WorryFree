// import { Component } from '@angular/core';

import { Component,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorryFree';
  bsModalRef: BsModalRef;
  constructor(private modalService:BsModalService){}
  showModal() {
    const initialState = {
      title: '模态框'
    };
    // 显示弹框
    this.bsModalRef = this.modalService.show(ChildComponent, { initialState });
    // 子组件关闭后，触发的订阅函数
    this.modalService.onHidden.subscribe(() => {
      //console.log('title', this.bsModalRef.content.title);
    });
    this.bsModalRef.content.onClose = (msg: string) => {
      //console.log('msg', msg);
      this.bsModalRef.hide();
    }
  }
  
}
