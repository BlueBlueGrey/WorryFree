import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Http } from '@angular/http';
import { Router,ActivatedRoute,NavigationEnd,ActivationEnd } from '@angular/router';
import 'rxjs/add/operator/filter'
@Component({
  selector: 'app-myLetter',
  templateUrl: './myLetter.component.html',
  styleUrls: ['./myLetter.component.css']
})
export class MyLetterComponent implements OnInit {
  isCollect=false;
  isPush=false;
  isTrash=false;
  msgService = MsgService.getInstance();
  constructor(private http:Http,private activatedroute:ActivatedRoute, router:Router) { 
    this.router=router
    let thisa=this
    router.events.filter(event=>event instanceof NavigationEnd).subscribe((event:NavigationEnd)=>{
      thisa.flag = thisa.activatedroute.snapshot.params['flag'];  
      thisa.isCollect= thisa.flag=='letter'?true:false; 
      thisa.isPush= thisa.flag=='push'?true:false; 
      thisa.isTrash= thisa.flag=='trash'?true:false; 
      thisa.curPage=1;
      this.tablePageList=[]
      thisa.getPageList();
      console.log("router.events")
    
    })
  }
  tablePageList=[];
  pageNo = 0; //当前页码
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 6; //单页显示数
  totalCount:0; //总页数
  curPage = 1; //当前页
  flag="";
  private router:Router;

  showPush={
    title:"",
    context:"",
    editor:"",
    date:"",
    url:"",
    collect_flag:0
  }


  ngOnInit() {
    this.getPageList();
  }

  clickContext(m,i){
    this.showPush=this.tablePageList[i]
    m.show()
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

  getPageList(str="",x=1) {
    let url='api/all_message';
    let which_right=0;
    let isLetter=false;
    // if(this.flag == 'public'){
    // }else{
    //   url = this.flag == 'privacy' ? 'api/all_message': 'api/all_message';
    // }
    let thisa =  this
    let params=null
    switch(this.flag){
      case 'public':
        url='api/show_letter';
        which_right=0;
        isLetter=true;
        break;
        case 'privacy':
          url='api/show_letter';
          which_right=1;
          isLetter=true;
          break;
        case 'draft':
          url='api/show_letter';
          which_right=2;
          isLetter=true;
          break;
        case 'letter':
          url='api/show_my_collect';
          isLetter=true;
          break;
    }
   if(isLetter){
     if(this.isCollect){
      params={
        username:this.msgService.USERNAME,
        page:x,
      }
     }
     else {
      params={
        username:this.msgService.USERNAME,
        page:x,
        which_right:which_right
      }
     }
   }
  let p= (this.flag == 'push'?params:params);
   if(this.flag == 'push'){
    url='api/show_my_xinli_collect'
       params={
        username:this.msgService.USERNAME,
        page:x
       }
  }
  console.log(url)
  console.log(params)
  
      this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      thisa.tablePageList=[]
      let len = data.length-1
      thisa.totalCount = data[len]['all_count']
      console.log(data)
      thisa.setPageParams()
      for(var i=0;i<data.length-1;i++){
        thisa.tablePageList.push(data[i])
     }
    
    })

  }
  changePage(event){
    let page=this.curPage
    this.getPageList("",page)
  }
  fromChildFunc(data){
    console.log(data)
  }
  
}
