import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  ngOnInit() {
  }
  title: string = '';
  onClose: any;
  showReply={
    context:'child',
    collect_flag:false
  }
  constructor(public bsModalRef: BsModalRef) { }
  close() {
    // 关闭弹窗
    this.bsModalRef.hide();
  }
  close2() {
    this.onClose('close');
  }
  test2() {
    console.log("child test")
    this.showReply.collect_flag=!this.showReply.collect_flag
  }
  test(){
    
  }
}
