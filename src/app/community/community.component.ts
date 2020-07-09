import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})

export class CommunityComponent implements OnInit {
  list = ['推荐','视频','搞笑','aaa','bbb','ccc'];
  config: SwiperConfigInterface;
  index= 0;
  swiperList: any[] = [];
  constructor() { }

  ngOnInit() {

    this.swiperList = [
      {
      


          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekoIf.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekWMd.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekhqI.jpg'
      },
      {
          imgUrl: 'https://s1.ax1x.com/2020/07/09/UekfsA.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/Uek2xH.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/UekIdP.jpg'
      },
      {
        imgUrl: 'https://s1.ax1x.com/2020/07/09/Uek5Zt.jpg'
     },

  ];
    this.config = {
      direction: 'horizontal',
            loop: true,
            speed: 2000,
            autoplay:1,
            pagination:'.swiper-pagination',
            preventClicks:true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplayDisableOnInteraction: false
            
   }

  }
  freshLetter(index){
    console.log(index)
  }

}
