import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
import { Http } from "@angular/http"
import { Router }from '@angular/router'
import { MsgService } from '../../services/CommonService'
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  msgService = MsgService.getInstance();
  constructor(private http:Http,private router:Router) { }

  ngOnInit() {
    
  }
  isLogin(){
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      console.log(data)
      if(data==0){
        console.log('没登录没登录没登录')
        thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        this.username=thisa.msgService.USERNAME
      }
    })
  }
  

}
