import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() width: number;
    @Input() height: number;
    @Input() showPopup: boolean;
    @Input() closebtn: boolean = true;
    @Output() popupData = new EventEmitter();
 
    ngOnInit(){
        this.width = this.width != undefined ? this.width : 500;
    }
 
    getStyle(){
        return { width: this.width + 'px', height: this.height + 'px' }
    }
 
    closePopupFn(){
        this.showPopup = false;
        this.popupData.emit(this.showPopup);
    }

}
