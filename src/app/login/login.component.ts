import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../constants';

import { AppComponent } from '../app.component';//for usertypevariable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ff: FormGroup;
  public loginsubmitted: Boolean = false;
  public successdata: any;

  constructor(private fb: FormBuilder, private router: Router, private htt:HttpClient) { }

  ngOnInit(): void {

    this.ff = this.fb.group({
      email: ['', Validators.required],  //was username....
      password: ['', Validators.required],
    })
  }


  onLogoutSubmit(){

    return this.htt.post(Constants.URL+"Logout",this.loginsubmitted/*,{ headers: { Authorization:localStorage.getItem('token') } }*/).subscribe((res) => {
      this.successdata = res;
      
      if(this.successdata['status'] == "success")
      {      window.alert("Usuario " + sessionStorage['name'] + " cerró sesion");    //WAS sstorage.name before
          localStorage.clear();
          sessionStorage.clear();
         //this.successdata['data']['name']+" has been Login successfully");
      }
      else  {
      console.log(res);
      sessionStorage.clear();   //regardless?? ? //Frontend validation primero, no importa que siga validado en server
      }

      //window.alert("unknown erorr at lougout");

  });}




  onLoginSubmit(logindata:any) { 
   

    return this.htt.post(Constants.URL+"Login", logindata).subscribe((res) => {
        this.successdata = res;
       // let resp:any = res;

        //console.log(res);
        
        if(this.successdata['status'] == "success")
        {
            window.alert("Bienvenido " + this.successdata['data']['name']+" a la plataforma CIET");
            
            let token = this.successdata['data']['access_token'];  //was res but cant be used like this anymopre
            localStorage.setItem("access_token",token);//already set on authintercept//'Bearer ' +token);

            sessionStorage.setItem("name",this.successdata['data']['name']);
          
              //console.log( this.successdata['payload'])
            Constants.userId  = this.successdata['data']['userId'];
            Constants.session = true;
            Constants.usertype = this.successdata['data']['usertype'];

            console.log(Constants.usertype)
           // sessionStorage.setItem("session","true");                       //experimental sess
            //sessionStorage.setItem("usertype",this.successdata['payload']['usertype']); 

            //AppComponent.myapp.usertype = this.successdata['payload']['usertype'];

            if(Constants.usertype == "Student"){
              this.router.navigate(['KardexAlumno']);
            }else   if(Constants.usertype == "Profesor"){
            this.router.navigate(['ListaClaseMaestro']);
              
            }else if(Constants.usertype == "Admin"){
              this.router.navigate(['/']);
            }
           // console.log(Constants.usertype)
            

          
        }else if(this.successdata['status'] == "error")
        {
          console.log("ERROR no coinciden")
          window.alert(this.successdata['message']);//"Datos de login incorrectos");
         /* Swal.fire({
          title: 'OPPS!!',
          text:   "Login details are not coreect.",
          icon: 'error'
        });*/
        }else {
          window.alert("unknown BUG");
        }

        //
      
        
    },  
    error =>{ window.alert("Error de conexión");   //error.message);
        console.log(error);}
    
    );
  }

}