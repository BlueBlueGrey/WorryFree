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

  }
  changePage(event){
    this.getPageList(this.theme,this.curPage)
}

refreshTheme(str){
  this.curPage=1
  this.tablePageList=[]
  this.theme=str
  this.getPageList(str,1);
}

getPageList(str="",x=1) {
  let url='api/send_xinli_message'
  let thisa =  this
  let params={ 
    page:x,
    top:str
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


}
