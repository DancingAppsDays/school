import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants';

//import {AgGridModule} from 'ag-grid-angular';


@Component({
  selector: 'app-listacursos',
  //imports:[AgGridModule],//only for standalone components
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.css']
})
export class ListacursosComponent implements OnInit {

 
  data:any;

  page: number=1;
  searchterm:string='';


  constructor(private _http: HttpClient,private router:Router) { }

  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])

    this._http.get(Constants.URL+"curso").subscribe({
      
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


  nuevocurso(){
    //console.log(equipo)
    this.router.navigate(['EditCurso']);
  }

  editcurso(curso: any){
    console.log(curso)
    this.router.navigate(['EditCurso'],{
      queryParams:{
        id:curso.id,
        name:curso.name,
        fechadeinicio:curso.fechadeinicio,
        fechadefinal:curso.fechadefinal,
        namecarrera:curso.namecarrera,
        idmaestro:curso.idmaestro
      }
    })

  }


  }

  


