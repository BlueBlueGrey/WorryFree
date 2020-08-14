import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http"
import { Router }from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Md5 } from "ts-md5/dist/md5";
import { MsgService } from '../services/CommonService'
// 映射
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msgService = MsgService.getInstance();
  username="";
  password="";
  constructor(private http:Http,private router:Router,private toastr: ToastrService){}
  showSuccess() {
    this.toastr.success('登录成功！',null,{timeOut: 1500});
  }
  showFail() {
    this.toastr.error('登录失败！',null,{timeOut: 1500});
  }
  logout(){
    let url='api/logout'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      if(data==1){
        thisa.msgService.loginFlag = false
        thisa.msgService.USERNAME = ""
        //console.log('注销')
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
        //console.log('没登录没登录没登录')
        thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        //console.log('登录')
        //console.log(data['username'])
        thisa.router.navigate(['/square'])
      }
    })

  }
  
  onLoginSubmit(){
    let url = 'api/login'
    let data={
      'username':this.username,
      'password':this.password
    }
    let thisa=this
    this.http.post(url,null,{params:data}).subscribe(function(res){
      
      let data =res.json()
      //console.log(data)
      if(data!=0){
        thisa.showSuccess()
        thisa.router.navigate(['/square'])
      }else{
        thisa.showFail()
      }
    });
}

}
