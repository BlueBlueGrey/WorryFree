import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  selectedIndex=0;
  url=['','person','community','push','unread-messages','','help'];
  constructor(public route:Router,public activatedroute:ActivatedRoute) { }

  ngOnInit() {
  }
  selectedIndexChange(index){
    if(index==0){
      this.route.navigate(['square'])
      this.selectedIndex=0
      
    }else if(index==5){
      this.route.navigate(['letter'])
    }
    else
    {
    let str=this.url[this.selectedIndex]
    this.route.navigate([str],{relativeTo: this.activatedroute});
   }
  }
}
