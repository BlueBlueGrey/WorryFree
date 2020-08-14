import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
@Input() isEven;
@Input() index;
@Input() obj;
@Output() fromChild=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
 test(){
   //console.log("sadf")
 }
 clickContext(){
   let data={
     showReply:this.obj,
     index:this.index
   }
   this.fromChild.emit(data)
   //console.log(this.obj)
 }
}
