import { Component, OnInit, Output, Input } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Http } from '@angular/http';

@Component({
  selector: 'app-replyItem',
  templateUrl: './replyItem.component.html',
  styleUrls: ['./replyItem.component.css']
})
export class ReplyItemComponent implements OnInit {
  msgService = MsgService.getInstance();
  constructor(private http:Http) { }
  
  ngOnInit() {
    
  }
  
  @Input() Obj;
  @Input() flag;
  @Input() isTrash;
  collect(letterId){
    let url='api/collect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="collect success"){
        thisa.Obj.collect_flag=!thisa.Obj.collect_flag
        console.log("show success")
      }
      })
  }
  deleteCollect(letterId){
    let url='api/delete_collect_letter'
    let thisa =  this
    let params={
      letterID:letterId,
      username: thisa.msgService.USERNAME
     }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      if(data.data=="delete collect success"){
        thisa.Obj.collect_flag=!thisa.Obj.collect_flag
        console.log("delete collect success")
      }
      })
  }

}
