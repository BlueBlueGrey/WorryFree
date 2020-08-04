import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoverComponent } from './cover/cover.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { SquareComponent } from './square/square.component';
import { PersonComponent } from './profile/person/person.component';
import { CommunityComponent } from './community/community.component';
import { PushComponent } from './push/push.component';
import { UnreadMessagesComponent } from './unreadMessages/unreadMessages.component';
import {  HelpComponent } from './help/help.component';
import {  DefaultCoverComponent } from './defaultCover/defaultCover.component';
import {  LetterComponent } from './letter/letter.component'
import {  LloginComponent } from './index/llogin/llogin.component'
import {  DaohangComponent } from './index/daohang/daohang.component'
import {  PubQuesComponent } from './index/nav/pubques.component'
import { ViewletterComponent } from './viewletter/viewletter.component'
import { PersonalDataComponent } from './profile/personalData/personalData.component'
import { MyLetterComponent } from './myLetter/myLetter.component'
import { ReplyComponent } from './reply/reply.component'
import { ViewreplyComponent } from './viewreply/viewreply.component'
import { ChildComponent } from './child/child.component'
import { from } from 'rxjs';
const routes: Routes = [
    { path: '',component:CoverComponent,
    },
    { path: 'square',
    component:SquareComponent,
    children:[
        {
            path:'',
            component: DefaultCoverComponent
        },
        {
            path:'person',
            component: PersonComponent,
            children:[
                {
                    path:'',
                    component:PersonalDataComponent
                },
                {
                    path:'personalData',
                    component:PersonalDataComponent
                },
                {
                    path:'dada',
                    component:PersonalDataComponent
                },
                {
                    path:'myletter/:flag',
                    component:MyLetterComponent
                },
                {
                    path:'collect/:flag',
                    component:MyLetterComponent
                }
                {
                    path:'myreply',
                    component:UnreadMessagesComponent
                }
            ]
        },
        {
            path:'community',
            component: CommunityComponent
        },
        {
            path:'push',
            component: PushComponent
        },
        {
            path:'unread-messages',
            component: UnreadMessagesComponent
        },
        {
            path:'help',
            component: HelpComponent
        },
        { path: 'letter',component:LetterComponent },
    ]    
},
    { path: 'login',component:LoginComponent },
    { path: 'letter',component:LetterComponent },
    { path: 'index',component:IndexComponent },
    { path: 'register',component:RegisterComponent },
    { path: 'forget',component:ForgetComponent },
    { path: 'viewletter/:id',component:ViewletterComponent },
    { path: 'reply/:id',component:ReplyComponent },
    // { path: 'viewreply',component:ViewreplyComponent}
];


@NgModule (
    {
        declarations:[
            IndexComponent,
            DaohangComponent,
            LloginComponent,
            PubQuesComponent,
        ],
        imports: [RouterModule.forRoot(routes),
            BrowserModule,
            FormsModule,
            HttpModule,
        ],
        exports: [RouterModule]
    }
)
export class AppRoutingModule{}