import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectorRef, NgZone, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from '../keyframes';

import {
  
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';

// import Swiper core and required components
import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { BehaviorSubject } from "rxjs";
import Swiper from "swiper/types/swiper-class";
import { AlertService } from '../services/alert.service';
import { Router, RouterLink } from '@angular/router';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  cards:any
  
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  show: any;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);

  datasource : any;
  count : number =0
  selecteddata: any;

  @ViewChildren('tinderCard') tinderCards!: QueryList<ElementRef>;
  tinderCardsArray!: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();

  moveOutWidth!: number;
  shiftRequired!: boolean;
  transitionInProgress!: boolean;
  heartVisible!: boolean;
  crossVisible!: boolean;
  animationState: any;
  index: any;


  constructor(private http:HttpClient,private cd: ChangeDetectorRef, private ngZone: NgZone,private renderer: Renderer2,private alert:AlertService,private route:Router) { }

  ngOnInit() {
   this.getJsonData().subscribe((data) => {
    this.datasource = data.data
    console.log(this.datasource,"data")
    this.selecteddata = this.datasource
    this.cards = this.selecteddata
    // this.loadTinderCards()
    // this.selecteddata =  this.datasource[this.count]
    // console.log(this.selecteddata)
   })


  }



  getJsonData(): Observable<any> {
    
    return this.http.get("./assets/data.json");
    
  }

  // getSlides() {
  //   this.slides$.next(Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`));
  // }

  // thumbsSwiper: any;
  // setThumbsSwiper(swiper:any) {
  //   this.thumbsSwiper = swiper;
  // }
  // controlledSwiper: any;
  // setControlledSwiper(swiper:any) {
  //   this.controlledSwiper = swiper;
  // }

  // indexNumber = 1;
  // exampleConfig = { slidesPerView: 3 };
  // slidesPerView: number = 4;
  // pagination: any = false;

  // slides2 = ['slide 1', 'slide 2', 'slide 3'];
  // replaceSlides() {
  //   this.slides2 = ['foo', 'bar'];
  // }

  // togglePagination() {
  //   if (!this.pagination) {
  //     this.pagination = { type: 'fraction' };
  //   } else {
  //     this.pagination = false;
  //   }
  // }

  // navigation = false;
  // toggleNavigation() {
  //   this.navigation = !this.navigation;
  // }

  // scrollbar: any = false;
  // toggleScrollbar() {
  //   if (!this.scrollbar) {
  //     this.scrollbar = { draggable: true };
  //   } else {
  //     this.scrollbar = false;
  //   }
  // }
  // breakpoints = {
  //   640: { slidesPerView: 2, spaceBetween: 20 },
  //   768: { slidesPerView: 4, spaceBetween: 40 },
  //   1024: { slidesPerView: 4, spaceBetween: 50 },
  // };

  // slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  // virtualSlides = Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`);

  // log(log: string) {
  //   // console.log(string);
  // }

  // breakPointsToggle: any;
  // breakpointChange() {
  //   this.breakPointsToggle = !this.breakPointsToggle;
  //   this.breakpoints = {
  //     640: { slidesPerView: 2, spaceBetween: 20 },
  //     768: { slidesPerView: 4, spaceBetween: 40 },
  //     1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 },
  //   };
  // }

  // slidesEx = ['first', 'second'];

  // onSlideChange(swiper: any) {
  //   if (swiper.isEnd) {
  //     // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
  //     this.ngZone.run(() => {
  //       this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
  //     });
  //     console.log(this.slidesEx);
  //   }
  // }




  loadPendingdata(){
    this.selecteddata = this.datasource
    console.log(this.selecteddata,this.datasource)

  }


  userClickedButton(event:any, heart:any,condition?:any) {
    console.log(event)
    console.log('conddi',condition)
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)'
      );
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.cards[0]);
        this.alert.showSuccess('shortlisted')
      
  
      
    } else {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)'
      );
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.cards[0]);

      this.alert.showError('Not interested')
  
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  handlePan(event:any) {
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.cards.length
    )
      return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.tinderCardsArray[0].nativeElement,
      'transform',
      'translate(' +
        event.deltaX +
        'px, ' +
        event.deltaY +
        'px) rotate(' +
        rotate +
        'deg)'
    );

    this.shiftRequired = true;
  }

  handlePanEnd(event:any) {
    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        ''
      );
      this.shiftRequired = false;
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' +
          toX +
          'px, ' +
          (toY + event.deltaY) +
          'px) rotate(' +
          rotate +
          'deg)'
      );

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross:any, heart:any) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.selecteddata.shift();
    }
  }

  emitChoice(heart:any, card:any) {
    this.choiceMade.emit({
      choice: heart,
      payload: card,
    });
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    console.log('=======>', JSON.parse(JSON.stringify(this.tinderCards)));
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
      console.log(
        '=======>',
        JSON.parse(JSON.stringify(this.tinderCardsArray))
      );
    });
  }

  startAnimation(state:any) {
    console.log(state)
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  
  resetAnimationState(state:any) {
    this.animationState = '';
    this.index++;
  }

  onSwipe(evt:any) {
    console.log(evt)
    console.log('fff')
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
if(x.includes('left') || y.includes('left') ){
  this.userClickedButton(evt,false,'yes')
}
else if(y.includes('right') || x.includes('right')){
  this.userClickedButton(evt,true,'yes')
  

}
    console.log(x,y,'aaaa')
    // this.eventText += `${x} ${y}<br/>`;
}



}
