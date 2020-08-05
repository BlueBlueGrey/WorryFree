
import { Component,TemplateRef,NgModule } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Http } from '@angular/http';
import { Router }from '@angular/router'
import { MsgService } from '../../services/CommonService'
// 映射
@Component({
  selector: 'app-llogin',
  templateUrl: './llogin.component.html',
  styleUrls: ['./llogin.component.css']
})
export class LloginComponent {
  title = 'WorryFree';
  msgService = MsgService.getInstance()
  modalRef:BsModalRef;
  constructor(private modalService:BsModalService,private http:Http,private router:Router){}
  ngOnInit(){
    let url='api/getSession'
    let thisa=this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      if(data==0){
        console.log('没登录没登录没登录')
        thisa.msgService.loginFlag = true
      }
      else{
        console.log('登录')
        console.log(data['nicheng'])
        thisa.msgService.loginFlag = false
        thisa.router.navigate(['/daohang'])
      }
    })
  }
  Register(template){
    // this.modalRef = this.modalService.show(template);
  }
  onRegisterSubmit(form:any){
      let url = 'apilogin'
      this.http.post(url,null,{params:form}).subscribe(function(data){
        
        console.log(data['_body'])
        if(data['_body']=='0'){
          console.log('注册成功')
        }
      });
  }
  onLoginSubmit(form:any){
    let url = 'apilogin'
    let thisa=this
    this.http.post(url,null,{params:form}).subscribe(function(res){
      
      let data =res.json()
      console.log(data)
      // if(data!=1){
      //   console.log("onLoginSubmit")
      //   console.log(data['nicheng'])
      //   thisa.router.navigate(['/daohang'])
      //   thisa.msgService.loginFlag = false
      // }else {
      //   console.log("登录失败")
      // }
    });
}
}
