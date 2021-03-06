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
import { ViewletterComponent } from './viewletter/viewletter.component';
import { PersonalDataComponent } from './profile/personalData/personalData.component'
import { from } from 'rxjs';
import { MyLetterComponent } from './myLetter/myLetter.component';
import { LetterItemComponent } from './letterItem/letterItem.component';
import { PushItemComponent } from './pushItem/pushItem.component';
import { ReturnComponent } from './return/return.component';
import { ReplyComponent } from './reply/reply.component';
import { ViewreplyComponent } from './viewreply/viewreply.component';
import { ChildComponent } from './child/child.component';
import { ReplyItemComponent } from './replyItem/replyItem.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
// import {MatDialogModule} from '@angular/material/dialog';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
   direction: 'horizontal',
   slidesPerView: 'auto'
 };
@NgModule({
   entryComponents: [
      ChildComponent
   ],
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
      ViewletterComponent,
      PersonalDataComponent,
      MyLetterComponent,
      LetterItemComponent,
      PushItemComponent,
      ReturnComponent,
      ReplyComponent,
      ViewreplyComponent,
      ChildComponent,
      ReplyItemComponent
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
      ToastrModule.forRoot(),
      MatDialogModule,
      MatMenuModule
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