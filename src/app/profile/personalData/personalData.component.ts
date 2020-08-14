import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http"
import { Router }from '@angular/router'
import { MsgService } from '../../services/CommonService'
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personalData',
  templateUrl: './personalData.component.html',
  styleUrls: ['./personalData.component.css']
})
export class PersonalDataComponent implements OnInit {
  username="";
  correcting=true;
  password="asdfasdf"
  constructor(private http:Http,private router:Router,private toastr: ToastrService) { }
  msgService = MsgService.getInstance();
  ngOnInit() {
    this.isLogin()
  }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.error(str,null,{timeOut: 1500});
  }
  correct(){
    this.correcting=false;
    let url='api/correct_password'
    let thisa =this
    let params={
      username:this.msgService.USERNAME,
      password:this.password
    }
    this.http.post(url,null,{params:params}).subscribe(function(res){
      let data=res.json()
      data=data.data
      //console.log(data)
      if(data=='success'){
        //console.log('修改成功')
        thisa.showSuccess('修改成功')
        thisa.correcting=true
        // thisa.router.navigate(['/login'])
        // thisa.msgService.loginFlag = false
      }
      
    })
  }

  isLogin(){
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
        //console.log('=====登录==========')
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        thisa.username=thisa.msgService.USERNAME
      }
    })
  }

}
