import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module'
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { CoverComponent } from './cover/cover.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { SquareComponent } from './square/square.component';
import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';
import { PushComponent } from './push/push.component';
import { UnreadMessagesComponent } from './unreadMessages/unreadMessages.component';
import { CommunityComponent } from './community/community.component';
import { PersonComponent } from './profile/person/person.component';
import { DefaultCoverComponent } from './defaultCover/defaultCover.component';
import { LetterComponent } from './letter/letter.component';
import { MatTreeModule} from '@angular/material/tree';
import {MatGridListModule} from '@angular/material/grid-list';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './pagination/pagination.component';
import { PopupCommonComponent } from './popup.component';
import { PopupComponent } from './popup/popup.component';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
   direction: 'horizontal',
   slidesPerView: 'auto'
 };
@NgModule({
   declarations: [
      AppComponent,
      CoverComponent,
      LoginComponent,
      RegisterComponent,
      ForgetComponent,
      SquareComponent,
      HelpComponent,
      PushComponent,
      UnreadMessagesComponent,
      CommunityComponent,
      PersonComponent,
      DefaultCoverComponent,
      LetterComponent,
      PaginationComponent,
      PopupCommonComponent,
      PopupComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      MatToolbarModule,
      MatTabsModule,
      MatIconModule,
      MatButtonModule,
      FormsModule,
      HttpClientModule,
      MatTreeModule,
      MatGridListModule,
      SwiperModule,
      MatCardModule,
      ToastrModule.forRoot()
   ],
   providers: [{
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
   }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

/*
 providers: [{
      provide: SWIPER_CONFIG, 
      useValue: DEFAULT_SWIPER_CONFIG
   }],
 */