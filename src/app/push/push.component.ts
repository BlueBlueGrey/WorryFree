



import { Component, OnInit, Injectable,TemplateRef,NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Router }from '@angular/router'
import { MsgService } from '../services/CommonService'
@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
export class PushComponent implements OnInit {
  showCollect=false;
  showMailbox=false;
  showMail=false;
  tablePageList = [];  //分页后前台显示数据
  pageNo = 0; //一共多少页
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 4; //单页显示数
  totalCount:0; //总页数
  curPage = 0; //当前页
  showPupup = false;
  theme=""
  constructor(private http:Http,private router:Router) { }

  ngOnInit() {
    console.log("push")
    let url='api/send_xinli_message'
    let thisa =  this
    let params={ 
      page:1,
      top: ""
     }
    console.log(params)
    this.http.get(url,{params:params}).subscribe(function(res){
      console.log("api/send_xinli_messag")
      let data = res.json()
      console.log(data)
      let len = data.length-1
      thisa.totalCount=data[len]['all_count']
      thisa.tablePageList=[]
      for(var i=0;i<data.length-1;i++){
        thisa.tablePageList.push(data[i])
      }
      console.log("show success")
      console.log(thisa.tablePageList)
      thisa.setPageParams()
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
  changePage(event){
    console.log("change")
    console.log(this.curPage)
    let page=this.curPage+""
    this.getPageList2(this.theme,page)
}

refreshTheme(str){
  console.log("refreshTheme")
  this.curPage=1
  this.tablePageList=[]
  this.theme=str
  this.getPageList2(str,1);
}
getPageList2(str,x) {
  let url='api/send_xinli_message'
  let thisa =  this
  console.log("getPageList2")
  let params={ 
    page:x,
    top:str
   }
console.log(params)
  this.http.get(url,{params:params}).subscribe(function(res){
    let data = res.json()
    console.log(data)
    console.log("getPageList")
    // console.log(res)
    thisa.tablePageList=[]
    let len = data.length-1
    thisa.totalCount = data[len]['all_count']
    console.log(data[len]['all_count'])
    console.log(thisa.totalCount)
    thisa.setPageParams()
    for(var i=0;i<data.length-1;i++){
      thisa.tablePageList.push(data[i])
   }
  })

}


}
