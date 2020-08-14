import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Http } from '@angular/http';
import { Router,ActivatedRoute,NavigationEnd,ActivationEnd } from '@angular/router';
import 'rxjs/add/operator/filter'
import * as $ from 'jquery'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-myLetter',
  templateUrl: './myLetter.component.html',
  styleUrls: ['./myLetter.component.css']
})
export class MyLetterComponent implements OnInit {
  isCollect=false;
  isPush=false;
  isTrash=false;
  showM=false;
  msgService = MsgService.getInstance();
  constructor(private http:Http,private activatedroute:ActivatedRoute, router:Router,private toastr: ToastrService) { 
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
      //console.log("router.events")
    
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
  editLetter={
    context:"",
    limit:0,
    letter_topic:"",
    letterID:0
  }
  showSuccess(str) {
    this.toastr.success(str,null,{timeOut: 1500});
  }
  showFail(str) {
    this.toastr.warning(str,null,{timeOut: 1500});
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
    //   url = this.flag == 'privacy' ? 'apiall_message': 'apiall_message';
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
        case 'trash':
          url='api/show_rubbish_letter'
          isLetter=true;
          break;
    }
   if(isLetter){
     if(this.isCollect||this.isTrash){
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
   if(this.flag == 'push'){
    url='api/show_my_xinli_collect'
       params={
        username:this.msgService.USERNAME,
        page:x
       }
  }
  //console.log(url)
  //console.log(params)
  
      this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      thisa.tablePageList=[]
      let len = data.length-1
      thisa.totalCount = data[len]['all_count']
      thisa.setPageParams()
      for(var i=0;i<data.length-1;i++){
        thisa.tablePageList.push(data[i])
     }
     //console.log(data)
      //console.log("*************8")
      //console.log(thisa.isPush)
      //console.log(thisa.tablePageList)
    
    })

  }
  changePage(event){
    let page=this.curPage
    this.getPageList("",page)
  }
  fromChildFunc(data){
    //console.log("sdfasdff")
    //console.log(data)
    this.getPageList("",1)
  }

  edit(m,i){
    // var myModal = document.getElementById('xx');
    // //console.log(myModal)
    this.editLetter=this.tablePageList[i]
    m.show()
    //console.log(this.editLetter)
    // myModal.show()
    
  }

  collect(letterId,i){
    let url='api/collect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    //console.log(url)
    //console.log(params)
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="collect success"){
        thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
        //console.log("show success")
      }
      })
  }


  recover(i){
    //console.log("recover")
    let url='api/recover_delete_letter'
    let thisa =  this
    let params={
      letterID:this.tablePageList[i].letterID,
      // username: thisa.msgService.USERNAME
     }
   
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      //console.log(data)
      if(data.data=="recover success"){
        // thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
        //console.log("recover success  success")
        thisa.getPageList()
      }
      })
  }
  delete(i){
    let url='api/delete_letter'
    if(this.isTrash){
      url='api/completely_delete_letter'
    }
    let thisa =  this
    let params={
      letterID:this.tablePageList[i].letterID,
      // username: thisa.msgService.USERNAME
     }
    //console.log(this.tablePageList[i])
    //console.log(params)
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="delete success"){
        // thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
        //console.log("delete  success")
        thisa.getPageList()
      }
      })
    
  }
  deleteCollect(id,i){
    //console.log("letterId,i")
    //console.log(this.tablePageList[i])
    let url='api/delete_collect_letter'
    let thisa =  this
    let params=null
     if(this.isPush){
       url='api/delete_collect_xinli';
       params={
        xinliID:id,
        username: thisa.msgService.USERNAME
       }
     }else{
      params={
        letterID:id,
        username: thisa.msgService.USERNAME
       }
     }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="delete collect success"){
        // thisa.tablePageList[i].collect_flag=!thisa.tablePageList[i].collect_flag
        // //console.log("delete collect success")
        thisa.getPageList()
      }
      })
  }

  report(id) {
    let url='api/report_letter'
    let thisa =  this
    let params={
      letterID:id,
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
  
  submit(f){

      //console.log(" submit  sdfasf")
      //console.log(this.editLetter)
      let data = {
        'letterID':this.editLetter.letterID,
        'flag':f,
        'letter_topic':this.editLetter.letter_topic,
        'right':this.editLetter.limit,
        'context':this.editLetter.context
      }
      let url='api/edit_letter'
      let thisa=this
      this.http.post(url,null,{params:data}).subscribe(function(res){
          let data=res.json()
          //console.log(data)
          data=data.data
          //console.log(data)
          if(data=='edit success'){
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