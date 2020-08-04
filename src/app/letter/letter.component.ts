import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  limit=0;
  letter_topic="爱情";
  context="";
  msgService = MsgService.getInstance()
  
  constructor(public route:Router,public activatedroute:ActivatedRoute,private toastr: ToastrService,private http:Http,private router:Router) { }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.warning(str,null,{timeOut: 1500});
  }
  ngOnInit(){
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      console.log(data)
      if(data==0){
        console.log('没登录')
        // thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
        thisa.msgService.USERNAME=""
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        console.log('登录')
        console.log(data['username'])
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
  submit(f){

    if(this.checkLogin()){
      let data = {
        'username':this.msgService.USERNAME,
        'flag':f,
        'letter_topic':this.letter_topic,
        'right':this.limit,
        'context':this.context
      }
      let url='api/write_letter/save'
      let thisa=this
      this.http.post(url,null,{params:data}).subscribe(function(res){
          let data=res.json()
          data=data.data
          if(data=='save success'){
            if(f==0){
              thisa.showSuccess('保存成功')
            }
            else{
              thisa.showSuccess('提交成功')
            }
          }else{
            thisa.showFail('该信件可能存在敏感词汇，待审核')
          }
      })
    }
    
  }
}
