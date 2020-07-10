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
// import { QuillModule } from 'ngx-quill';
const routes: Routes = [
    { path: '',component:CoverComponent,
    // children:[
    //     {
    //         path:'llogin',
    //         component:LloginComponent
    //     },
    //     {
    //         path:'daohang',
    //         component:DaohangComponent,
    //         children:[
    //             {
    //                 path:'pubque',
    //                 component:PubQuesComponent,
    //             },
    //             // {
    //             //     path:'',
    //             //     component: ,
    //             // },
    //             // {
    //             //     path:'',
    //             //     component: ,
    //             // }
    //             // {
    //             //     path:'',
    //             //     component: ,
    //             // }
    //         ]
    //     },
    // ]
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
            component: PersonComponent
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
   
    { path: 'index',component:IndexComponent },
    { path: 'register',component:RegisterComponent },
    { path: 'forget',component:ForgetComponent }
];


@NgModule (
    {
        declarations:[
            IndexComponent,
            DaohangComponent,
            LloginComponent,
            PubQuesComponent
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