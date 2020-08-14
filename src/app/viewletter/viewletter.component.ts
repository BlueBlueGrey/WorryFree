import { Component, OnInit, Input,TemplateRef } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Router,ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http"
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as $ from 'jquery'
import { ChildComponent } from '../child/child.component';
import { NgModule } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@NgModule({
  entryComponents: [
     
     ChildComponent
  ],
  
})
@Component({
  selector: 'app-viewletter',
  templateUrl: './viewletter.component.html',
  styleUrls: ['./viewletter.component.css']
})
export class ViewletterComponent implements OnInit {
  limit=0;
  bsModalRef: BsModalRef;
  letter_topic="";
  context="";
  letter={
    context:"",
    letterID:0,
    letter_topic:""
  };

  tablePageList = [];  //分页后前台显示数据
  pageNo = 0; //当前页码
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 6; //单页显示数
  totalCount:0; //总页数
  curPage = 0; //当前页

  obj={
    reply_context:"nice to meet you",
    collect_flag:1
  };

  showReply={
    reply_context:"nice to meet you too",
    collect_flag:1,
    id:0
  };
  msgService = MsgService.getInstance();
  id="";
  constructor(public route:Router,
    public activatedroute:ActivatedRoute,
    private toastr: ToastrService,
    private http:Http,
    private router:Router,
    private modalService: BsModalService) { }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.warning(str,null,{timeOut: 1500});
  }
  ngOnInit(){
    let url='api/getSession'
    this.id = this.activatedroute.snapshot.params['id']
    //console.log("id")
    //console.log(this.id)
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
    this.onIntiData()
    this.getPageList()
  }
  onIntiData(){
    
    let url='api/get_letter_byID'
    let params={
      letterID:this.id
    }
    let thisa =this
    this.http.get(url,{params:params}).subscribe(function(res){
      let data=res.json()
      //console.log(data)
      thisa.letter=data[0]
      // if(data==0){
      //   //console.log('没登录没登录没登录')
      //   // thisa.router.navigate(['/login'])
      //   thisa.msgService.loginFlag = false
      //   thisa.msgService.USERNAME=""
      // }
      // else{
      //   thisa.msgService.loginFlag = true
      //   thisa.msgService.USERNAME = data['username']
      //   //console.log('登录')
      //   //console.log(data['username'])
      //   // thisa.router.navigate(['/square'])
      // }
    })
  }

  setPageParams(){
    let len = this.totalCount
    if (len >= 1) {
      if (len % this.pageSize === 0) {
        this.pageNo = Math.floor(len / this.pageSize);
      } else {
        this.pageNo = Math.floor(len / this.pageSize) + 1;
      }
      if (this.pageNo < this.curPage) {
        this.curPage = this.curPage - 1;
      }
      if (this.pageNo === 1 || this.curPage === this.pageNo) {
        this.preShow = this.curPage !== 1;
        this.nextShow = false;
      } else {
        this.preShow = this.curPage !== 1;
        this.nextShow = true;
      }
    } else {
      this.tablePageList.length = 0;
      this.pageNo = 1;
      this.curPage = 1;
    }

  }

  getPageList(x=1) {
    let url='api/get_reply_letter'
    let thisa =  this
    let params={ 
      letterID:this.id,
      page:x,
      username:this.msgService.USERNAME
   }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      thisa.tablePageList=[]
      let len = data.length-1
      thisa.totalCount = data[len]['all_count']
      thisa.setPageParams()
      for(var i=0;i<data.length-1;i++){
        thisa.tablePageList.push(data[i])
     }
    
    })

  }
  changePage(event){
    this.getPageList(this.curPage)
  }

  goback(){
    history.go(-1);
  }

 report() {
   //console.log("举报举报")
  let url='api/report_letter'
  let thisa =  this
  let params={
    letterID:this.id,
    // username: thisa.msgService.USERNAME
   }
   //console.log("report--d--d---")
   //console.log(params)
  this.http.get(url,{params:params}).subscribe(function(res){
    let data = res.json()
    //console.log("report-------")
    //console.log(data)
    if(data.data=="report success"){
      // thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
      // //console.log("delete collect success")
      thisa.showSuccess('举报成功')
    }
    })
   
 }

 report2(){
  //console.log(this.showReply)
  let url='api/report_reply_letter'
  let thisa =  this
  let params={
    reply_id:this.showReply.id,
    // username: thisa.msgService.USERNAME
   }
   //console.log("report--reply---")
   //console.log(params)
  this.http.get(url,{params:params}).subscribe(function(res){
    let data = res.json()
    //console.log("report-------")
    //console.log(data)
    if(data.data=="report success"){
      // thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
      // //console.log("delete collect success")
      thisa.showSuccess('举报成功')
    }
    })

 }
  test(){

  }
  showModal(index){
    const initialState = {
      showReply: this.showReply
    };
    // 显示弹框
    this.bsModalRef = this.modalService.show(ChildComponent, { initialState,class:'m-content' ,backdrop:false});
    // 子组件关闭后，触发的订阅函数
    this.modalService.onHidden.subscribe(() => {
      //console.log('title', this.bsModalRef.content.showReply);

    });
    this.bsModalRef.content.onClose = (msg: string) => {
      //console.log('msg', msg);
      this.bsModalRef.hide();
    }

  }
  fromChildFunc(data){
    this.showReply=data.showReply
    //console.log(data)
    this.showModal(data.index)
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
      let data={
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
          //console.log("submit")
          //console.log(data)
          if(data==1){
            if(f==0){
              thisa.showSuccess('保存成功')
            }
            else{
              thisa.showSuccess('提交成功')
            }
          }
      })
    }
    
  }
  test2(){

  }
  clickContext(m,i){
    this.showReply=this.tablePageList[i]
    m.show()
  }
}

