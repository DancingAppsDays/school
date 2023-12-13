import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Constants } from 'src/app/constants';

import { FilterPipePipe } from 'src/app/filter-pipe.pipe';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-listamaestros',
  templateUrl: './listamaestros.component.html',
  styleUrls: ['./listamaestros.component.css']
})
export class ListamaestrosComponent implements OnInit {

  sucessdata:any;
  data:any;

  page: number=1;
  searchterm:string='';


  constructor(private _http: HttpClient,private router:Router) { }

  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])

    this._http.get(Constants.URL+"maestro").subscribe(data => {

      this.sucessdata = data;
      console.log(this.sucessdata);
      this.data = data;
      /*
      if(this.sucessdata['status'] == "success"){

      this.data = this.sucessdata['data'];
      console.log("success");
      }else{
        console.log("no status success");
        window.alert(this.sucessdata['data']);// + '    No autorizado');
       // this.router.navigate(['/']);

      }*/
    }, error =>{ window.alert("Error de conexión");   //error.message);
    console.log(error.error.message);
    if(error.error.message =='Unauthorized')
    AppComponent.myapp.logout();
  
    }

    );
  }
  


  nuevomaestro(){
    //console.log(equipo)
    this.router.navigate(['EditMaestro']);
  }

  editMaestro(equipo: any){
    console.log(equipo)
    this.router.navigate(['EditMaestro'],{
      queryParams:{
        id:equipo.id,
        nombre:equipo.fullName,
        puesto:equipo.birthday
      }
    })

  }


  }

  


