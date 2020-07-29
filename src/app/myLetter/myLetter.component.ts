import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Http } from '@angular/http';
@Component({
  selector: 'app-myLetter',
  templateUrl: './myLetter.component.html',
  styleUrls: ['./myLetter.component.css']
})
export class MyLetterComponent implements OnInit {

  msgService = MsgService.getInstance();
  constructor(private http:Http) { }
  tablePageList=[];
  pageNo = 0; //当前页码
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 6; //单页显示数
  totalCount:0; //总页数
  curPage = 0; //当前页
  ngOnInit() {
    this.getPageList();
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

  getPageList() {
    let url='api/all_message'
    let thisa =  this
    console.log("aaaa")
    let prams={ 
      letter_topic:"",
      username:this.msgService.USERNAME,
      page:'1'
    }
    this.http.get(url,{params:prams}).subscribe(function(res){
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
  getPageList2(str,x) {
    let url='api/all_message'
    let thisa =  this
    console.log("asdfadsfasdf")
    console.log(str)
    console.log("asdfadsfasdf")
    let params={ 
      letter_topic:str,
      page:x,
      username:this.msgService.USERNAME
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
  changePage(event){
    console.log("change")
    console.log(this.curPage)
    let page=this.curPage
    this.getPageList2("",page)
  }

}
