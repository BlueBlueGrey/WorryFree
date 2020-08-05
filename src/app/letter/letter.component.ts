import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http"
import { ToastrService } from 'ngx-toastr';
import { Md5 } from "ts-md5/dist/md5";
import { AES, mode, pad, enc } from 'crypto-js';
@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  limit=0;
  letter_topic="爱情";
  context="";
  id=0;
  isEdit=false;
  msgService = MsgService.getInstance()
  
  constructor(public route:Router,public activatedroute:ActivatedRoute,private toastr: ToastrService,private http:Http,private router:Router) { 
    this.id = this.activatedroute.snapshot.params['id'];
    console.log(this.id)
    if(this.id)
    {
      this.isEdit=true
      console.log("this.isEdit=true")
      
    }
    else{
      console.log("write")
    }
  }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.warning(str,null,{timeOut: 1500});
  }
  ngOnInit(){
    let url='apigetSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      console.log(data)
      if(data==0){
        console.log('没登录没登录没登录')
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
  encryptByEnAES(data: string): string {
    let Key = "123456";
    let tmpAES = AES.encrypt(data, Key, {
      mode: mode.CBC,
      padding: pad.Pkcs7
    });
    return tmpAES.toString();
  }
  encryptByDeAES(data: string): string {
    let Key = "123456";
    let tmpDeAES = AES.decrypt(data, Key, {
      mode: mode.CBC,
      padding: pad.Pkcs7
    });
    return tmpDeAES.toString(enc.Utf8);
  }
  submit(f){

    // console.log(this.context)
    // let s=this.encryptByEnAES(this.context)
    // console.log(s)
    // console.log(this.encryptByDeAES(s))

    if(this.checkLogin()){
      let data = {
        'username':this.msgService.USERNAME,
        'flag':f,
        'letter_topic':this.letter_topic,
        'right':this.limit,
        'context':this.context
      }
      let url='apiwrite_letter/save'
      let thisa=this
      this.http.post(url,null,{params:data}).subscribe(function(res){
          let data=res.json()
          console.log(data)
          data=data.data
          console.log(data)
          if(data=='reply success'){
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
