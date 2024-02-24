import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';


import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  formu: FormGroup;
  datarouted:any;
  data:any;
  
  page: number=1;
  searchterm:string='';

  cursoname:string;

  numerodefechas=20;    //debuggin
  fechas:number[];
  asistencias:string[]=[];
  alumnoasistencias:(boolean | undefined)[][]=[];


  constructor( private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute,) { 

      this.fechas= Array(this.numerodefechas).fill(1).map((x,i)=>i+1);
      //console.log(this.fechas)
    }

  ngOnInit(): void {
    if(Constants.usertype!="Profesor") { this.router.navigate(['/'])
    return
  }
  this.formu = this.formBuilder.group({       
    Cursoname:'',
    Carreraname:'',
    periodo:'',
    FechaInicio:'',
    FechaFinal:''
});

this.router2.queryParams.subscribe(async (params:Params) =>{

  this.datarouted=params
  //this.formu.get('id')?.setValue(this.datarouted.id);
 // console.log(this.datarouted)
      this.showMaestro(this.datarouted);
 
})
  this.getInscritos(this.datarouted.idmaestro,this.datarouted.idcurso) 

}//end of init

showMaestro(contentdata:any){
  this.formu.patchValue({
    id: contentdata.id,
    //fullName: contentdata.fullName,
    Cursoname:contentdata.namecurso,
      Carreraname:contentdata.namecarrera,
      periodo:contentdata.periodo,
      FechaInicio:contentdata.fechadeinicio,
      FechaFinal:contentdata.fechadefinal
})

}

getInscritos(idmaestro: number,idcurso:number) //check if number..
{ 
  this.http.get(Constants.URL+"inscrito"+'/maestro/'+idmaestro+'/'+idcurso).subscribe(
    {
        next: res=> {
            console.log(res);
           
            this.data= res ;
            this.data = this.data['data']

            this.data.forEach( (element:any) => {
              
              
              this.asistencias.push(element.asistencia)

            });
            console.log(this.asistencias);

            this.asistencias.forEach(element => {

              this.alumnoasistencias.push(Array.from(element).map(char=>char==='1'))
              
            });
            console.log(this.alumnoasistencias)

        },
        error:error=>console.log(error)

    

      // this.updateform(this.exs);
      
     } );
}

    registrarAsistencia(){

      console.log(this.alumnoasistencias)

      //return;
      var newstrings:string[]=[];

     this.alumnoasistencias.forEach(element => {
     
      //let filledArray: (boolean | undefined)[] = element.map(value => value !== undefined || null ? value : false); //almost chatgpt! almost!
      let filledArray: (boolean | undefined)[] = Array.from({ length: element.length }, (_, i) =>  element[i] !== undefined ?  element[i] : false);

      console.log(filledArray)

       newstrings.push(filledArray.map(bool => (bool ===true) ? '1' : '0').join(''));
     });

    // console.log(this.alumnoasistencias)
     console.log(newstrings)



    for(let i=0; i<this.data.length; i++){
      this.data[i].asistencia = newstrings[i];     

      console.log(this.data[i])
     }
     
     console.log(this.data)

     

    const postRequests = this.data.map((value: any) =>
    this.http.patch(Constants.URL+"inscrito/"+value.id, value)  
     );

     forkJoin(postRequests).subscribe(
      {
      next:  res=> {    
        console.log('HTTP POST Results:', res);
        window.alert("Registro de asistencias exitoso");
        // Handle the results as needed
      },
      error: error => {
        console.error('HTTP POST Error:', error);
        window.alert("Error de conexión");   //error.message);
        console.log(error.error.message);

        // Handle errors
      }

    });




    }

}
