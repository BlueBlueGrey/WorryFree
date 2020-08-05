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

  getPageList(str="",x=1) {
    let url='apiall_message'
    let thisa =  this
    let params={ 
      letter_topic:str,
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

  popLetter(template,index){
    template.show()
    this.showLetter=this.tablePageList[index]
    // this.modalRef = this.modalService.show(template);
  }

  changePage(event){
      this.getPageList(this.theme,this.curPage)
      console.log("createNonceStr")
    console.log("createNonceStr")
    console.log("createNonceStr")
    console.log("createNonceStr")
    let s=this.msgService.createNonceStr()
    console.log(s);
    console.log("createNonceStr")
  }
  ngOnInit() {
    console.log("createNonceStr")
    console.log("createNonceStr")
    console.log("createNonceStr")
    console.log("createNonceStr")
    let s=this.msgService.createNonceStr()
    console.log(s);
    console.log("createNonceStr")
    this.showLetter={
      "letter_topic":"",
      "context":"",
      "username":"",
      "letterID":null,
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
    this.tablePageList=[]
    this.theme=this.themes[index]
    this.getPageList(this.themes[index],1)
    this.curPage=1
  }
  collect(letterId,index){
    let url='apicollect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="collect success"){
        thisa.tablePageList[index].collect_flag=!thisa.tablePageList[index].collect_flag
        console.log("show success")
      }
      })
  }
  deleteCollect(letterId,index){
    let url='apidelete_collect_letter'
    let thisa =  this
    let params= {
      letterID:letterId,
      username: thisa.msgService.USERNAME
    }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="delete collect success"){
        thisa.tablePageList[index].collect_flag=!thisa.tablePageList[index].collect_flag
        console.log("delete collect success")
      }
      })
  }
}
