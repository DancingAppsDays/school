import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Constants } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school';
  sesion:boolean|null|undefined; 

  public loginsubmitted: Boolean = false;
  successdata: any;

  static myapp: any;
  usertype:any="undefined"


  constructor( private htt:HttpClient) { }

  ngOnInit(): void {
    console.log("initapp")
    AppComponent.myapp = this;    //singleton to use logout anywhere.. other ooptions inject service everywehre or @input @output
    
        //on init session is always clean
      //this.sesion = sessionStorage.getItem('session');
    
    }

    logout(){
      console.log("loggout");
      //window.alert("todo logout");

      localStorage.clear();
      sessionStorage.clear();

      Constants.session =false;
      Constants.usertype="notype"
    }

    onLogoutSubmit(){

      console.log("LOGOUT butt");
  
      return this.htt.post(Constants.URL+"Logout",this.loginsubmitted).subscribe((res) => {
        this.successdata = res;
        
        if(this.successdata['status'] == "success")
        {      window.alert("Usuario " + sessionStorage['username'] + " cerró sesion");
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

    ngDoCheck() {    //was ngdocheck, cada typeo ! ! !
      //this.sesion = sessionStorage.getItem('session');    //how bad is performance??
      this.sesion = (Constants.session);
      this.usertype = Constants.usertype
      //console.log(this.sesion);
      //console.log("dochecked");
    }
  
}
