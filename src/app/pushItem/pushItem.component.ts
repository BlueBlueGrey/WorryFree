import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Http } from '@angular/http'
@Component({
  selector: 'app-pushItem',
  templateUrl: './pushItem.component.html',
  styleUrls: ['./pushItem.component.css']
})
export class PushItemComponent implements OnInit {
  @Input() item;
  @Output() fromChild = new EventEmitter();
  constructor(private http:Http) { }
  
  ngOnInit() {
  }
  deleteCollect(id){
    this.fromChild.emit('delete')
      // let url=""
      // let params={
      //   id:id
      // }
      // let thisa=this
      // this.http.post(url,{params:params}).subscribe(
      //   function(res){
      //     let data = res.json()
      //   if(data.data=="delete collect success"){
      //     console.log("delete collect success")
      //     thisa.fromChild.emit('delete')
      //   }
      //   }
      // )
  }
}
