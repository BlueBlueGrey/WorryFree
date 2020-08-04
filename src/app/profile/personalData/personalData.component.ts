import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http"
import { Router }from '@angular/router'
import { MsgService } from '../../services/CommonService'
@Component({
  selector: 'app-personalData',
  templateUrl: './personalData.component.html',
  styleUrls: ['./personalData.component.css']
})
export class PersonalDataComponent implements OnInit {
  username="";
  constructor(private http:Http,private router:Router) { }
  msgService = MsgService.getInstance();
  ngOnInit() {
    this.isLogin()
  }
  isLogin(){
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
        console.log('=====登录==========')
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        thisa.username=thisa.msgService.USERNAME
      }
    })
  }

}
