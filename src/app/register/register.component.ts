import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router }from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  password: string;
  repassword: string;
  email:string;
  public anyList:any
  constructor(private http:Http,private toastr: ToastrService,private router:Router) { }
  showSuccess() {
    this.toastr.success('注册成功！',null,{timeOut: 1500});
  }
  showFail() {
    this.toastr.error('注册失败！',null,{timeOut: 1500});
  }
  ngOnInit() {
    
  }
  register(){
    let data ={
      "username":this.name,
      "password":this.password,
      "email":this.email
    };
    //console.log("register============");
    // 跨域 get
    let url = 'api/register/';
    let thisa=this
    this.http.post(url,null,{params:data}).subscribe(function(res){
      let data = res.json()
      if(data==1){
        thisa.showSuccess()
        thisa.router.navigate(['/login'])
      }else{
        thisa.showFail()
      }
    });
  }
  checkPassword(event){
    //console.log(event);
  }

}
