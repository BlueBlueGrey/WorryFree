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
const routes: Routes = [
    // { path: '',component:CoverComponent },
    { path: '',component:SquareComponent },

    { path: 'login',component:LoginComponent },
    { path: 'index',component:IndexComponent },
    { path: 'register',component:RegisterComponent },
    { path: 'forget',component:ForgetComponent }
];


@NgModule (
    {
        declarations:[
            IndexComponent
        ],
        imports: [RouterModule.forRoot(routes),
            FormsModule,
            HttpModule
        ],
        exports: [RouterModule]
    }
)
export class AppRoutingModule{}