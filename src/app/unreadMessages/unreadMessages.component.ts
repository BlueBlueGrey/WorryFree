import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Router }from '@angular/router'
import { MsgService } from '../services/CommonService'
@Component({
  selector: 'app-unreadMessages',
  templateUrl: './unreadMessages.component.html',
  styleUrls: ['./unreadMessages.component.css']
})
export class UnreadMessagesComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  msgService = MsgService.getInstance()
  constructor(private http:Http,private router:Router) { }

  tablePageList = [];  //分页后前台显示数据
  pageNo = 0; //一共多少页
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 4; //单页显示数
  totalCount:0; //总页数
  curPage = 0; //当前页

  ngOnInit() {
    this.getPageList()
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
    console.log(this.pageNo)
  }
  changePage(event){
    this.getPageList(this.curPage)
}
getPageList(x=1) {
  let url='api/receive_reply_letter'
  let thisa =  this
  let params={
    page:x,
    username:this.msgService.USERNAME
   }
  this.http.get(url,{params:params}).subscribe(function(res){
    let data = res.json()
    console.log(data)
    thisa.tablePageList=[]
    let len = data.length-1
    thisa.totalCount = data[len]['all_count']
    console.log(thisa.totalCount)
    thisa.setPageParams()
    for(var i=0;i<data.length-1;i++){
      thisa.tablePageList.push(data[i])
   }
  })

}

}
