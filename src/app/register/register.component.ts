import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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
  constructor(private http:Http) { }
  ngOnInit() {
    let data ={
      "username":"xx",
      "password":"122",
      "email":"df"
    };
    this.http.post('api/register/',null,{params:data}).subscribe(
    function (data){
      console.log(data)
    }
    );
    console.log("sdfasdfasdfas")
    console.log("sdfasdfasdfas")
  }
  register(){
    console.log("star============");

    console.log(this.name);
    console.log(this.password);
    console.log(this.repassword);
    console.log(this.email);
    console.log("register============");
    // 跨域 get
    let url = 'api/register';
    // this.http.get(url).subscribe(function(data){
    //   console.log(data['_body']);
    // });
  }
  checkPassword(event){
    console.log(event);
  }

}
