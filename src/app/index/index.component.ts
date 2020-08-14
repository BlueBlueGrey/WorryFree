// import { Component } from '@angular/core';

import { Component,TemplateRef,NgModule } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http } from '@angular/http';
import { Router }from '@angular/router'
import { MsgService } from '../services/CommonService'
// 映射
@Component({
  selector: 'app-root',
  templateUrl: './index.html',
})
export class IndexComponent {
  title = 'WorryFree';
  modalRef:BsModalRef;
  msgService = MsgService.getInstance();
  constructor(private modalService:BsModalService,private http:Http,private router:Router){}
  logout(){
    let url='api/logout'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      if(data==1){
        thisa.msgService.loginFlag = false
        //console.log('注销')
        thisa.msgService.USERNAME = ""
        thisa.router.navigate(['/login'])
      }
    })
  }
  ngOnInit(){
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      //console.log(data)
      if(data==0){
        //console.log('没登录没登录没登录ii')
        thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
      }
      else{
        thisa.msgService.loginFlag = true
        
        //console.log('登录')
        //console.log(data['nicheng'])
        thisa.router.navigate(['/daohang'])
      }
    })
  }
  Register(template){
    this.modalRef = this.modalService.show(template);
  }
  onRegisterSubmit(form:any){
      let url = 'apiregister/'
      this.http.post(url,null,{params:form}).subscribe(function(data){
        
        //console.log(data['_body'])
        if(data['_body']=='0'){
          //console.log('注册成功')
        }
      });
  }
  onLoginSubmit(form:any){
    let url = 'apilogin/'
    this.http.post(url,null,{params:form}).subscribe(function(res){
      //console.log(res)
      let data =res.json()
      if(data!=1){
        //console.log("success")
        // //console.log(json['nicheng'])
      }else {
        //console.log("登录失败")
      }
    });
}
}
