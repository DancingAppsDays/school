import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calificarclasemaestro',
  templateUrl: './calificarclasemaestro.component.html',
  styleUrls: ['./calificarclasemaestro.component.css']
})
export class CalificarclasemaestroComponent implements OnInit {

 
  formu: FormGroup;
  datarouted:any;
  data:any;
  
  page: number=1;
  searchterm:string='';

  cursoname:string;

  calis:any;

 
  
  
  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }
  
  
  
  
  
  
  
  ngOnInit(): void {

    if(Constants.usertype!="Profesor") { this.router.navigate(['/'])
      return
  }
  
    //this should be taken from entity
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
  
  
  
          },
          error:error=>console.log(error)
  
      
  
        // this.updateform(this.exs);
        
       } );
  }
  
  
  
  
  
  updateform(resp: any) {
  //console.log(res[0])
    let res= resp;//[0];
  
  this.formu.patchValue({
      id: res.id,
      fullName: res.fullName,
      birthday: res.birthday
  
  })
  
  console.log("end of patch");
  }
  
  calificarcurso(contentdata: any){
  
    console.log(contentdata);
    this.router.navigate(['CalificarClase'],{
      queryParams:{
        nombreprofesor:this.datarouted.name,
        id:contentdata.id,
        nombre:contentdata.name,
        fechainicio:contentdata.fechainicio
      }
    })  
    }

  registrarCalis(){

    
    //console.log('Input values:', this.data.map((item: { calificacion: Number; }) => item.calificacion));
  
    var newdata =  this.data.map((item: { calificacion: any; }) => item.calificacion);
    //console.log(newdata);

    for(let i=0; i<this.data.length; i++){
      this.data[i].calificacion = newdata[i];
      if (this.data[i].calificacion>10)  this.data[i].calificacion =10;
 }

      //console.log(this.data);

    const postRequests = this.data.map((value: any) =>
     // this.http.post(Constants.URL+"inscrito"+'/maestro/'+this.datarouted.idmaestro+'/'+this.datarouted.idcurso, value)
     this.http.patch(Constants.URL+"inscrito/"+value.id, value)
   
    
     );
    
    
    forkJoin(postRequests).subscribe(
      {
      next:  res=> {    
        console.log('HTTP POST Results:', res);
        window.alert("Registro de calificación exitoso");
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


//use forkjoin to paralalel httprequest
/*import { forkJoin } from 'rxjs';
ngOnInit(): void {
  const $countries = this.httpClient.get<[]>('assets/countries.json');
  const $cities = this.httpClient.get<[]>('assets/cities.json');

  forkJoin([$countries, $cities]).subscribe(([countries, cities]) => {
    // All data available
    console.log(countries);
    console.log(cities);
    this.resultMessage = `Fetched ${countries.length} and ${cities.length} cities`;
  });
}*/
