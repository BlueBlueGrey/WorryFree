import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  theme=0;
  limit=0;
  constructor() { }

  ngOnInit() {
  }
  goback(){
    history.go(-1);
  }
}
