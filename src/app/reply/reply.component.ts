import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  limit=0;
  letter_topic="爱情";
  context="";
  msgService = MsgService.getInstance()
  id=0
  constructor(public route:Router,public activatedroute:ActivatedRoute,private toastr: ToastrService,private http:Http,private router:Router) { }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.warning(str,null,{timeOut: 3000});
  }
  ngOnInit(){
    this.id = this.activatedroute.snapshot.params['id']
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      //console.log(data)
      if(data==0){
        //console.log('没登录没登录没登录')
        // thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
        thisa.msgService.USERNAME=""
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        //console.log('登录')
        //console.log(data['username'])
        // thisa.router.navigate(['/square'])
      }
    })
  }

  goback(){
    history.go(-1);
  }
  checkLogin(){
    if(this.msgService.USERNAME==""){
      this.showFail('未登录');
      return false;
    }
    return true;
  }
  reply(){

    if(this.checkLogin()){
      let data = {
        'username':this.msgService.USERNAME,
        'letterID':this.id,
        'context':this.context
      }
      let url='api/reply_letter'
      let thisa=this
      this.http.post(url,null,{params:data}).subscribe(function(res){
          let data=res.json()
          data=data.data
          if(data=='reply success'){
            thisa.showSuccess('回复成功')
          }
          else{
            thisa.showFail('该回复可能存在敏感词汇，待审核')
          }
      })
    }
    
  }
  
}
