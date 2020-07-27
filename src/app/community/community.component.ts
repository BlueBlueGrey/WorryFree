import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Http } from '@angular/http';
import { Router }from '@angular/router'
import { MsgService } from '../services/CommonService'
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})

export class CommunityComponent implements OnInit {
  //假数据
  modalRef:BsModalRef;
  showLetter:{}
  msgService = MsgService.getInstance()
  tablePageList = [];  //分页后前台显示数据
  pageNo = 0; //当前页码
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 6; //单页显示数
  totalCount:0; //总页数
  curPage = 0; //当前页
  showPupup = false;

  config: SwiperConfigInterface;
  index= 0;
  swiperList: any[] = [];
  theme="";
  themes:any[] = [];
  text="解忧杂货店是一间致力于为人们 提供一个抒发心理烦恼平台的网页，在这里，你可以通过写信的方式来抒发自己内心的苦闷和烦.....将信件通过匿名的方式发布到广场社区，你可以看到别人匿名回复给你的信件"
  constructor(private modalService:BsModalService,private http:Http,private router:Router) { }
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
    if(str!=="")
    {
      str = "'"+str+"'"
    }
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

  popLetter(template,index){
    console.log("popLetter")
    template.show()
    this.showLetter=this.tablePageList[index]
    // this.modalRef = this.modalService.show(template);
  }

  changePage(event){
      console.log("change")
      console.log(this.curPage)
      let page=this.curPage
      this.getPageList2(this.theme,page)
  }
  ngOnInit() {
    this.showLetter={
      "letter_topic":"这个是信件主题",
      "context":"内内内内内容这个是信件主题这个是信件容这个是信件主题这个是信件容这个是信件主题这个是信件内容这个是信件主题这个是信件容这个是信件主题这个是信件内容这个是信件主题这个是信件容这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题,内容这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题内容这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题内容这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题这个是信件主题",
      "username":"lidan",
      "letterID":"16" ,
      "collect_flag":0
    };
    this.getPageList();
    this.themes=["学业","求职工作","人际关系","亲情","爱情",
    "压力","吐槽"]
    this.swiperList = [
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekoIf.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekWMd.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekhqI.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekfsA.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/Uek2xH.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/UekIdP.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/Uek5Zt.jpg'
     },

  ];
    this.config = {
      direction: 'horizontal',
            loop: true,
            speed: 2000,
            autoplay:1,
            pagination:'.swiper-pagination',
            preventClicks:true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplayDisableOnInteraction: false
            
   }

  }
  freshLetter(index){
    console.log(index)
    this.tablePageList=[]
    this.theme=this.themes[index]
    this.getPageList2(this.themes[index],1)
    this.curPage=1
  }
  collect(letterId,index){
    console.log("collect")
    console.log(letterId)
    let url='api/collect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    console.log(params)
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="collect success"){
        thisa.tablePageList[index].collect_flag=!thisa.tablePageList[index].collect_flag
        console.log("show success")
      }
      })
  }
  deleteCollect(letterId,index){
    console.log("deleteCollect")
    console.log(letterId)
    let url='api/delete_collect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    console.log(params)
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      // console.log("show success")
      if(data.data=="delete collect success"){
        thisa.tablePageList[index].collect_flag=!thisa.tablePageList[index].collect_flag
        console.log("delete collect success")
      }
      })
  }
}
