import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MsgService } from '../services/CommonService'
import { Http } from "@angular/http"
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  selectedIndex=0;
  msgService = MsgService.getInstance()
  url=['','person','community','push','unread-messages','','help'];
  constructor(public route:Router,public activatedroute:ActivatedRoute,private http:Http,private router:Router) { }

  ngOnInit(){
    let url='api/getSession'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      console.log(data)
      if(data==0){
        console.log('没登录')
        thisa.router.navigate(['/login'])
        thisa.msgService.loginFlag = false
        thisa.msgService.USERNAME = ""
      }
      else{
        thisa.msgService.loginFlag = true
        thisa.msgService.USERNAME = data['username']
        console.log('登录')
        console.log(data['username'])
        thisa.router.navigate(['/square'])
      }
    });
    console.log(this.activatedroute)
    this.activatedroute.data.subscribe(function(res){

        console.log("------");
        console.log(res)
        console.log("------");

    });
  }
  selectedIndexChange(index){
    if(index==0){
      this.route.navigate(['square'])
      this.selectedIndex=0
      
    }else if(index==5){
      // this.route.navigate(['letter'],{relativeTo: this.activatedroute});
      this.route.navigate(['letter'])
    }
    else
    {
    let str=this.url[this.selectedIndex]
    this.route.navigate([str],{relativeTo: this.activatedroute});
   }
  }
  logout(){
    let url='api/logout'
    let thisa =this
    this.http.get(url).subscribe(function(res){
      let data=res.json()
      if(data==1){
        thisa.msgService.loginFlag = false
        thisa.msgService.USERNAME = ""
        console.log('注销')
        thisa.router.navigate(['/login'])
      }
    })
  }
}
