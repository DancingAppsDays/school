import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.component.html',
  styleUrls: ['./lista-alumno.component.css']
})
export class ListaAlumnoComponent implements OnInit {

  //sucessdata:any;
  data:any;

  page: number=1;
  searchterm:string='';


  constructor(private _http: HttpClient,private router:Router) { }

  ngOnInit(): void {

    if(Constants.usertype!="Admin"){
      this.router.navigate(['/'])
      return
    }
    
    this._http.get(Constants.URL+"alumno").subscribe({
      
      next: res=> {
        console.log(res);       
        this.data= res ;  
    },
    error:error=>{
      console.log(error);
      window.alert("Falla de conexión: " + error.name);
      
    }
    });
   
  }




  nuevoalumno(){
    //console.log(equipo)
    this.router.navigate(['EditAlumno']);
  }

  editAlumno(equipo: any){
    console.log(equipo)
    this.router.navigate(['EditAlumno'],{
      queryParams:{
        id:equipo.id,
        nombre:equipo.fullName,
        puesto:equipo.birthday
      }
    })

  }

  InscribirAlumno(equipo: any){
    console.log(equipo)
    this.router.navigate(['InscribirAlumno'],{
      queryParams:{
        id:equipo.id,
        nombre:equipo.fullName,
        //puesto:equipo.birthday
      }
    })

  }

  VerCursosAlumno(equipo: any){
    console.log(equipo)
    this.router.navigate(['ListaInscrito'],{
      queryParams:{
        id:equipo.id,
        nombre:equipo.fullName,
        //puesto:equipo.birthday
      }
    })

  }

}
