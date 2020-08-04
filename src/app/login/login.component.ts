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
        console.log('注销')
        thisa.router.navigate(['/login'])
      }
    })
  }
  ngOnInit(){
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      console.log(data)
      if(data==0){
        console.log('没登录')
        thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        console.log('登录')
        console.log(data['username'])
        thisa.router.navigate(['/square'])
      }
    })

    console.log(Md5.hashStr('加密'));
    //十六进制字符串，32位小写，常用
    //56563edf23b9d717dc63981b8836fc60
    console.log(Md5.hashStr('加密', true));
    //32 位二补码有符号整数,大小4字节
    // [-549562794, 400013603, 462971868, 1627141768]
    console.log(Md5.hashAsciiStr('加密'));
    //十六进制字符串
    //2228f0e9007f05342a4be3f5377d8a29
    console.log(Md5.hashAsciiStr('加密', true));
    //32 位二补码有符号整数,大小4字节
    //[-370137054, 872775424, -169653462, 696941879]

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
      console.log(data)
      if(data!=0){
        thisa.showSuccess()
        thisa.router.navigate(['/square'])
      }else{
        thisa.showFail()
      }
    });
}

}
