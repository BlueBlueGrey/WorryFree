import { Component, OnInit, Output, Input } from '@angular/core';
import { MsgService } from '../services/CommonService'
import { Http } from '@angular/http';
@Component({
  selector: 'app-letterItem',
  templateUrl: './letterItem.component.html',
  styleUrls: ['./letterItem.component.css']
})
export class LetterItemComponent implements OnInit {
  msgService = MsgService.getInstance();
  constructor(private http:Http) { }
  
  ngOnInit() {
    console.log(this.Obj)
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
  report(id){
    let url='api/report_letter'
    let thisa =  this
    let params={
      letterID:id,
      // username: thisa.msgService.USERNAME
     }
    this.http.get(url,{params:params}).subscribe(function(res){
      let data = res.json()
      console.log("report-------")
      console.log(data)
      if(data.data=="report success"){
        // thisa.Obj.collect_flag=!thisa.Obj.collect_flag
        // console.log("delete collect success")
      }
      })
  }

}
